# Project Rebound Center Digital Display

This repository powers the television display in the CSUSB Project Rebound Center.

Live display: https://mgriggs1989-web.github.io/project-rebound-center/

## The easy way to update the display

You normally edit only `content.txt`. You do not need to change `index.html`.

1. Open [`content.txt`](content.txt) in this repository.
2. Click the pencil icon labeled **Edit this file**.
3. Change only the text after a colon. Keep every label on the left exactly as written.
4. Scroll down and click **Commit changes**.
5. Use a short description such as `Update weekly center schedule`.
6. Commit directly to the `main` branch.

GitHub Pages normally republishes within a few minutes. The television display refreshes itself every 15 minutes, so staff do not need to touch the Raspberry Pi.

### Example

Before:

```text
TUE: Schedule updates coming soon
```

After:

```text
TUE: FAFSA workshop · 2:00 p.m. · SMSU South 116
```

Do not add quotation marks or delete the label before the colon.

## Updating weekly dates

The four date badges use a short top label and a large bottom value:

```text
MON_MONTH: AUG
MON_DATE: 17
MON: Study hall · 10:00 a.m.–2:00 p.m.
```

Update `WEEK_RANGE` at the beginning of each week.

## Adding approved photographs

Only publish photographs approved for public display.

1. Open the [`images`](images) folder.
2. Select **Add file → Upload files**.
3. Upload a JPG, PNG, or WebP image. Use a short filename without spaces, such as `welcome-fall-2026.jpg`.
4. Commit the uploaded image to `main`.
5. Open `content.txt` and update one or both photo lines:

```text
WELCOME_PHOTO: images/welcome-fall-2026.jpg
SPOTLIGHT_PHOTO: images/student-name.jpg
```

The webpage crops photographs to a landscape frame. Images around 1600 × 1200 pixels or larger work well.

## Student privacy

- Obtain written permission before displaying a student's name, quotation, photograph, class year, or major.
- Do not publish student IDs, private schedules, case notes, phone numbers, personal email addresses, supervision information, or service details.
- Remember that this repository and the live webpage are public.

## What each file does

- `content.txt` — staff-editable schedule, announcements, contact information, photo paths, and spotlight text.
- `index.html` — display design and functionality. Do not edit unless changing the layout.
- `images/` — approved public display photographs.

## If an update does not appear

1. Wait up to 10 minutes for GitHub Pages to deploy.
2. Check the repository's **Actions** tab for a Pages build error.
3. Refresh the webpage manually. The center televisions refresh automatically every 15 minutes.

For layout or design changes, ask Michael or the person maintaining the webpage rather than editing `index.html` directly.
