# Project Rebound Center Display: Staff Editing Guide

Routine updates should be made in one of three places:

| What you want to update | Where to update it |
|---|---|
| Screen wording, links, alerts, and timing | `content.txt` |
| Upcoming public events | Project Rebound’s public Outlook calendar |
| Community photographs | GitHub’s `gallery/` folder |

Do not edit `index.html`, `styles.css`, or `app.js` for routine updates.

## Editing content.txt

1. Open the `project-rebound-center` repository on GitHub.
2. Select `content.txt`.
3. Select the pencil icon, **Edit this file**.
4. Change only the text after a colon.
5. Select **Commit changes** and commit to `main`.
6. Wait several minutes for GitHub Pages, then refresh the display once.

Every setting uses this format:

```text
LABEL: Text shown on the television
```

Keep labels on the left unchanged. Keep each value on one line. Lines beginning with `#` are instructions and do not appear on the television.

## Important announcement screen

The announcement screen is optional:

```text
ALERT_ACTIVE: YES
ALERT_HEADLINE: Center closed Friday
ALERT_TEXT: Project Rebound will reopen Monday at 8:00 a.m.
ALERT_EXPIRES: Friday, August 28
```

Use `YES` to add the announcement to rotation. Change it to `NO` when the message expires. Do not use this screen for confidential student information.

## Cover and welcome screen

Update the cover through:

```text
COVER_KICKER:
COVER_HEADLINE:
COVER_HEADLINE_ACCENT:
COVER_QUOTE:
COVER_WELCOME:
COVER_LOGO:
```

Update “You Belong Here” through:

```text
WELCOME_KICKER:
WELCOME_HEADLINE:
WELCOME_HEADLINE_ACCENT:
WELCOME_BODY:
WELCOME_MISSION:
WELCOME_PHOTO: images/welcome-met-community.jpg
```

The current welcome image is the approved photograph at The Metropolitan Museum of Art. New welcome images should be uploaded to `images/` and referenced by repository path. The page uses `object-fit: contain`, so the entire portrait or landscape image remains visible.

## Services

The services screen includes nine active services and three optional expansion slots:

```text
SERVICES_KICKER:
SERVICES_HEADLINE:
SERVICES_INTRO:

SERVICE1_NAME:
SERVICE1_BODY:
...
SERVICE9_NAME:
SERVICE9_BODY:

SERVICE10_ACTIVE: NO
SERVICE10_NAME:
SERVICE10_BODY:
...
SERVICE12_ACTIVE: NO
SERVICE12_NAME:
SERVICE12_BODY:
```

Keep descriptions concise. Change an optional service’s `ACTIVE` field to `YES` only after adding approved wording. Leave it at `NO` to keep that card off the screen.

## Current Rebound Scholars / Start Here

Update the page heading and its three steps through:

```text
START_KICKER:
START_HEADLINE:
START_BODY:
START1_TITLE:
START1_BODY:
START2_TITLE:
START2_BODY:
START3_TITLE:
START3_BODY:
CANVAS_CTA:
CANVAS_URL:
RESOURCES_URL:
```

Always test public URLs and QR codes after changing them.

## News stories

Each news article has its own television screen. Five story groups are available: `NEWS1` through `NEWS5`.

```text
NEWS1_ACTIVE: YES
NEWS1_KICKER:
NEWS1_SECTION_HEADLINE:
NEWS1_SECTION_MESSAGE:
NEWS1_INITIALS:
NEWS1_TAG:
NEWS1_HEADLINE:
NEWS1_SUMMARY:
NEWS1_URL:
NEWS1_IMAGE:
NEWS1_CTA_PREFIX: Scan to read
NEWS1_CTA:
```

- Use `NEWS1_ACTIVE: NO` to remove that story from the rotation.
- `NEWS1_URL` creates the story’s QR code.
- `NEWS1_IMAGE` accepts an approved repository image path or a stable public HTTPS image.
- Keep summaries to two short sentences.
- Scan every changed QR code from several feet away.

The fifth story currently contains the October 14 “What Does True Justice Look Like?” event. Update or deactivate it after the event.

## Project Rebound Justice Lab

Editable fields include the headline, explanatory copy, three activity groups, CTA, contact, and link:

```text
JUSTICE_LAB_KICKER:
JUSTICE_LAB_HEADLINE:
JUSTICE_LAB_BODY:
JUSTICE_LAB_ACTIVITY1_NAME:
JUSTICE_LAB_ACTIVITY1_BODY:
JUSTICE_LAB_ACTIVITY2_NAME:
JUSTICE_LAB_ACTIVITY2_BODY:
JUSTICE_LAB_ACTIVITY3_NAME:
JUSTICE_LAB_ACTIVITY3_BODY:
JUSTICE_LAB_JOIN_LABEL:
JUSTICE_LAB_CTA:
JUSTICE_LAB_CONTACT:
JUSTICE_LAB_LINK_LABEL:
JUSTICE_LAB_URL:
```

## Housing Initiative

The housing page supports four editable assistance pathways:

```text
HOUSING_KICKER:
HOUSING_HEADLINE:
HOUSING_BODY:
HOUSING_CTA_TITLE:
HOUSING_CTA_BODY:
HOUSING_CONTACT_HEADING:
HOUSING_DISCLAIMER:

HOUSING_SUPPORT1_LABEL:
HOUSING_SUPPORT1_NAME:
HOUSING_SUPPORT1_BODY:
...
HOUSING_SUPPORT4_LABEL:
HOUSING_SUPPORT4_NAME:
HOUSING_SUPPORT4_BODY:
```

Do not publish individual award amounts, student circumstances, or promises of assistance unless the wording has been approved.

## Prospective-student interest page

```text
INTEREST_KICKER:
INTEREST_HEADLINE:
INTEREST_BODY:
ELIGIBILITY_TEXT:
INTEREST_CTA:
INTEREST_FORM_URL:
INTEREST_DISCLAIMER:
```

Use only eligibility language approved by Project Rebound leadership. If the URL is blank or invalid, the webpage hides the QR code and displays “Form link coming soon.”

## Volunteer page

```text
VOLUNTEER_KICKER:
VOLUNTEER_HEADLINE:
VOLUNTEER_BODY:
VOLUNTEER_AUDIENCE:
VOLUNTEER_ROLE1:
...
VOLUNTEER_ROLE6:
VOLUNTEER_CTA:
VOLUNTEER_FORM_URL:
VOLUNTEER_DISCLAIMER:
```

Leave `VOLUNTEER_FORM_URL` blank until an approved public form is ready. A submission does not guarantee placement.

## Center schedule, workshops, and ticker

For each schedule entry, update its short month, date, weekday, and description:

```text
WEEK_RANGE:
MON_MONTH:
MON_DATE:
MON_DAY:
MON:
```

Repeat for `TUE`, `WED`, and `THU`. Reminders use `DEADLINE1` through `DEADLINE3`.

Workshops use:

```text
WS1_WHEN:
WS1_NAME:
WS1_NOTE:
```

Repeat for `WS2` and `WS3`.

The bottom messages use `TICKER1` through `TICKER4`.

## Display timing

Timing is staff-editable in seconds:

```text
DEFAULT_SCREEN_SECONDS: 15
GALLERY_SCREEN_SECONDS: 90
GALLERY_PHOTO_SECONDS: 7
STORY_SCREEN_SECONDS: 20
TICKER_SECONDS: 7
```

Regular and story screens cannot be set below 10 seconds. Avoid making the gallery so long that other information disappears from view for several minutes.

## Outlook events

The Upcoming Events screen is generated from the public Outlook calendar feed. Add or edit events in Outlook, not `calendar-events.json`.

The GitHub workflow checks the public feed and publishes up to eight upcoming events. If an event does not appear:

1. Confirm it was added to the correct public Project Rebound calendar.
2. Open the repository’s **Actions** tab.
3. Select **Update public calendar events**.
4. Confirm the latest run has a green check.
5. Refresh the display.

## Community Gallery photographs

1. Open the repository’s `gallery/` folder.
2. Select **Add file → Upload files**.
3. Upload an approved JPG, JPEG, PNG, WebP, or GIF.
4. Commit to `main`.

Use numbered descriptive filenames:

```text
01-community-lunch.jpg
02-rebound-scholar-orientation.jpg
03-graduation-celebration.jpg
```

The number controls order. The rest becomes the caption. Portrait and landscape photos use `object-fit: contain` so the complete photograph remains visible.

Obtain permission before publicly displaying identifiable students. Never include student IDs, case information, supervision status, or confidential details in filenames or captions.

## Music

The current music source is a hidden YouTube Study Beats livestream. `MUSIC_LABEL` changes only the on-screen label. Raspberry Pi autoplay behavior is described in `KIOSK-SETUP.md`.

## Preview and verify

Live display:

https://mgriggs1989-web.github.io/project-rebound-center/

After every update:

1. Wait for GitHub Pages to deploy.
2. Refresh once.
3. Use arrow keys or navigation dots to inspect every active screen.
4. Confirm text does not clip at 1920 × 1080.
5. Scan changed QR codes.
6. Confirm the gallery shows complete photographs.
7. Confirm pages, ticker, and gallery photos continue rotating.
8. Confirm music continues during screen changes.
9. Confirm no confidential information appears.

## Project Rebound design and content rules

- Use Coyote Blue, light blue, white, deep navy, and black.
- Do not add gold, yellow, orange, or unrelated accent colors.
- Preserve the official Project Rebound logo and “Welcome home” identity.
- Use dignified, non-stigmatizing, public-service language.
- Keep text brief enough to read across a large room.
- Display only approved public information.
