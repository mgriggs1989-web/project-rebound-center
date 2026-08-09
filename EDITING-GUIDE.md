# Project Rebound Center Display: Staff Editing Guide

The center display is designed so routine updates can be completed without editing HTML, CSS, or JavaScript. Staff should normally edit only `content.txt`, the public Outlook calendar, or the `gallery` folder.

## Quick reference

| Update | Where to make it |
|---|---|
| Hours, contact information, weekly schedule, deadlines, workshops, ticker, spotlight, interest wording, eligibility wording, and volunteer wording | `content.txt` |
| Prospective-student interest-form link | `INTEREST_FORM_URL` in `content.txt` |
| Volunteer-form link | `VOLUNTEER_FORM_URL` in `content.txt` |
| Upcoming events | Public Project Rebound Outlook calendar |
| Community Gallery photographs | `gallery/` folder |
| Welcome and spotlight photographs | Upload to `images/`, then update `content.txt` |
| Music volume | `MUSIC_VOLUME` in `content.txt` |
| Playlist tracks and licenses | `music-playlist.json` and `MUSIC-CREDITS.md` |

## Edit `content.txt`

1. Open the `project-rebound-center` repository.
2. Select `content.txt`.
3. Click the pencil icon labeled **Edit this file**.
4. Change only the text after the colon.
5. Select **Commit changes** and commit directly to `main`.

Every editable line follows this format:

```text
LABEL: Text shown on the television
```

Do not change or delete the label on the left.

## Prospective-student interest page

These fields control the separate “Interested in Project Rebound?” screen:

```text
INTEREST_KICKER: Take the first step
INTEREST_HEADLINE: Interested in Project Rebound?
INTEREST_BODY: Tell us about your educational goals.
ELIGIBILITY_TEXT: Insert only eligibility language approved by Project Rebound leadership.
INTEREST_CTA: Complete the interest form
INTEREST_FORM_URL: https://your-approved-form-address
INTEREST_DISCLAIMER: Submitting this form is not an admissions decision or a guarantee of program eligibility.
```

The current `INTEREST_FORM_URL` points to the existing Project Rebound student questionnaire. Replace the complete URL when an approved interest form changes.

Do not invent or infer eligibility rules. Use only language approved by Project Rebound leadership. If criteria are under review, use a neutral direction to contact staff rather than publishing unconfirmed requirements.

## Volunteer page

These fields control the separate volunteer screen:

```text
VOLUNTEER_KICKER: Give your time · Share your strengths
VOLUNTEER_HEADLINE: Volunteer with Project Rebound
VOLUNTEER_BODY: Help strengthen a community where Rebound Scholars are seen, supported, and connected to opportunity.
VOLUNTEER_AUDIENCE: CSUSB students, faculty, staff, alumni, community members, and approved partners are welcome to inquire.
VOLUNTEER_CTA: Express your interest
VOLUNTEER_FORM_URL:
VOLUNTEER_DISCLAIMER: Submitting an interest form does not guarantee placement.
```

Until an approved public volunteer form exists, leave `VOLUNTEER_FORM_URL` blank. The screen will show “Form link coming soon” and will not display a broken QR code.

When the form is ready:

1. Paste the complete public HTTPS address after `VOLUNTEER_FORM_URL:`.
2. Commit the change to `main`.
3. Wait several minutes for GitHub Pages.
4. Open the live display and scan the QR code with a phone that is not logged into a CSUSB administrator account.
5. Confirm that the form opens for the intended public audience.

## Verify either form QR code

After changing a form URL:

1. Open the live display.
2. Navigate to the interest or volunteer screen using the dots or arrow keys.
3. Scan the QR code from several feet away.
4. Confirm that it opens the correct public form.
5. Complete a test submission if appropriate.

If a URL is blank or invalid, the webpage intentionally hides the QR code and button.

## Weekly schedule and announcements

Update the weekly heading and each date badge:

```text
WEEK_RANGE: Week of August 17
MON_MONTH: AUG
MON_DATE: 17
MON: Study hall · 10:00 a.m.–2:00 p.m.
```

Repeat the pattern for Tuesday, Wednesday, and Thursday. Keep descriptions short enough to read across the center.

Update reminders through `DEADLINE1`, `DEADLINE2`, and `DEADLINE3`. Update workshops through the `WS1`, `WS2`, and `WS3` fields.

## Outlook events

The Upcoming Events screen reads the public Outlook calendar feed listed as `CALENDAR_ICS_URL`. Add or edit events in Outlook—not in `calendar-events.json`.

The GitHub workflow checks the Outlook feed and publishes up to eight upcoming events. The display checks the generated event data every five minutes. If events do not appear, open the repository’s **Actions** tab, select **Update public calendar events**, and confirm that the latest run has a green check.

## Community Gallery photographs

1. Open the repository’s `gallery` folder.
2. Select **Add file → Upload files**.
3. Upload approved JPG, JPEG, PNG, WebP, or GIF images.
4. Commit directly to `main`.

Use numbered, descriptive filenames:

```text
01-community-lunch.jpg
02-rebound-scholar-orientation.jpg
03-graduation-celebration.jpg
```

The number controls the order. The remainder becomes the on-screen caption. Images rotate every six seconds and use `object-fit: contain`, so portrait and landscape photographs are not cropped.

Obtain written permission before publicly displaying identifiable students. Never use student IDs, case information, supervision information, or other confidential details in filenames or captions.

## Welcome and spotlight photographs

Upload approved images to `images/`, then update:

```text
WELCOME_PHOTO: images/welcome-fall-2026.jpg
SPOTLIGHT_PHOTO: images/student-name.jpg
```

Recommended images are at least 1600 × 1200 pixels. Use authentic approved Project Rebound photographs when available. The bundled stock images are placeholders and do not depict Project Rebound students.

## Music

`MUSIC_VOLUME` accepts a number from `0.00` to `1.00`. The recommended center setting is `0.10`. Music shuffles continuously and does not restart when screens rotate. Raspberry Pi kiosk autoplay instructions are in `KIOSK-SETUP.md`.

## Preview all screens

Live display:

https://mgriggs1989-web.github.io/project-rebound-center/

After committing an update:

1. Wait several minutes for GitHub Pages to deploy.
2. Refresh the live display once.
3. Use the navigation dots or arrow keys to review all 11 screens.
4. Confirm that text fits, photographs are appropriate, and QR codes remain visible.
5. Scan every changed QR code.
6. Confirm that music continues while screens change.

## Project Rebound design rules

- Use Coyote Blue, light blue, white, deep navy, and black.
- Do not add gold, yellow, orange, AmeriCorps colors, or unrelated accent colors.
- Preserve the official Project Rebound logo and “Welcome home” identity.
- Keep text concise, dignified, non-stigmatizing, and readable across a large room.
- Do not copy AmeriCorps logos, illustrations, wording, or page designs.
- Display only approved public information.

For design or functionality changes, contact the webpage maintainer rather than modifying `styles.css` or `app.js` during routine updates.
