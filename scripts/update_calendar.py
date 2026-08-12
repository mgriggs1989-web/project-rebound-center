#!/usr/bin/env python3
import json
import re
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
PACIFIC = ZoneInfo("America/Los_Angeles")

def content_value(label):
    match = re.search(rf"^{label}:\s*(\S+)\s*$", (ROOT / "content.txt").read_text(), re.M)
    if not match:
        raise RuntimeError(f"Missing {label} in content.txt")
    return match.group(1)

def unfold(text):
    return re.sub(r"\r?\n[ \t]", "", text).splitlines()

def clean(value):
    return value.replace(r"\n", " ").replace(r"\,", ",").replace(r"\;", ";").replace(r"\\", "\\").strip()

def parse_datetime(name, value):
    all_day = "VALUE=DATE" in name or (len(value) == 8 and "T" not in value)
    if all_day:
        return datetime.strptime(value[:8], "%Y%m%d").replace(tzinfo=PACIFIC), True
    is_utc = value.endswith("Z")
    raw = value[:-1] if is_utc else value
    has_seconds = len(raw) >= 15
    parsed = datetime.strptime(raw[:15] if has_seconds else raw[:13], "%Y%m%dT%H%M%S" if has_seconds else "%Y%m%dT%H%M")
    return parsed.replace(tzinfo=timezone.utc if is_utc else PACIFIC), False

def parse_events(text):
    events, current = [], None
    for line in unfold(text):
        if line == "BEGIN:VEVENT":
            current = {}
        elif line == "END:VEVENT" and current is not None:
            if "start" in current:
                events.append(current)
            current = None
        elif current is not None and ":" in line:
            name, value = line.split(":", 1)
            key = name.split(";", 1)[0]
            if key == "DTSTART":
                current["start"], current["all_day"] = parse_datetime(name, value)
            elif key == "DTEND":
                current["end"], _ = parse_datetime(name, value)
            elif key == "SUMMARY":
                current["title"] = clean(value)
            elif key == "LOCATION":
                current["location"] = clean(value)
    return events

def display_event(event, now):
    start = event["start"]
    end = event.get("end", start + (timedelta(days=1) if event.get("all_day") else timedelta(hours=1)))
    if end.astimezone(timezone.utc) < now:
        return None
    return {
        "title": event.get("title", "Project Rebound event"),
        "location": event.get("location", ""),
        "start": start.isoformat(),
        "end": end.isoformat(),
        "all_day": bool(event.get("all_day")),
    }

def load_priority_events(now):
    path = ROOT / "priority-events.json"
    if not path.exists():
        return []
    events = []
    for item in json.loads(path.read_text()).get("events", []):
        start = datetime.fromisoformat(item["start"])
        end = datetime.fromisoformat(item["end"])
        if end.astimezone(timezone.utc) < now:
            continue
        events.append({
            "title": item["title"],
            "location": item.get("location", ""),
            "start": start.isoformat(),
            "end": end.isoformat(),
            "all_day": bool(item.get("all_day")),
        })
    return events

def event_key(event):
    title = re.sub(r"\W+", " ", event["title"].lower()).strip()
    return title, event["start"][:10]

def main():
    now = datetime.now(timezone.utc)
    live_events = []
    try:
        request = urllib.request.Request(content_value("CALENDAR_ICS_URL"), headers={"User-Agent": "Project-Rebound-Display/1.0"})
        with urllib.request.urlopen(request, timeout=45) as response:
            raw = response.read().decode("utf-8-sig")
        live_events = [display_event(event, now) for event in parse_events(raw)]
        live_events = [event for event in live_events if event]
    except Exception as error:
        print(f"Outlook calendar unavailable; using verified priority events: {error}")

    merged = {event_key(event): event for event in load_priority_events(now)}
    for event in live_events:
        merged[event_key(event)] = event
    output = sorted(merged.values(), key=lambda item: item["start"])
    event_file = ROOT / "calendar-events.json"
    upcoming = output[:8]
    if event_file.exists():
        existing = json.loads(event_file.read_text())
        if existing.get("events") == upcoming:
            return
    payload = {"generated_at": now.isoformat(), "events": upcoming}
    event_file.write_text(json.dumps(payload, indent=2) + "\n")

if __name__ == "__main__":
    main()
