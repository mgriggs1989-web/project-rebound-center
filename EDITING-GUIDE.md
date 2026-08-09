# Project Rebound Center Display: Editing Tutorial

This guide explains how Project Rebound staff can update the center television display without programming experience.

## Quick reference

| What you want to change | File to edit |
|---|---|
| Hours, schedule, workshops, deadlines, ticker, contact information, or student spotlight | `content.txt` |
| Welcome or student photograph | Upload to `images/`, then edit `content.txt` |
| Wording built permanently into a screen | `index.html` |
| Colors, fonts, sizes, cards, spacing, or visual design | `styles.css` |
| Slide timing, automatic refresh, clock, or content-loading behavior | `app.js` |

For routine updates, staff should edit only `content.txt`.

---

## Part 1: Update the schedule or announcements

### Step 1: Open the content file

1. Open the `project-rebound-center` repository.
2. Select `content.txt`.
3. Click the pencil icon labeled **Edit this file**.

Direct link: [Open content.txt](content.txt)

### Step 2: Change the text

Each editable item follows this pattern:

```text
LABEL: Text shown on the television
```

Change only the wording after the colon. Do not change or delete the label.

Example:

```text
TUE: Schedule updates coming soon
```

Change it to:

```text
TUE: FAFSA workshop · 2:00 p.m. · SMSU South 116
```

### Step 3: Commit the update

1. Click **Commit changes**.
2. Enter a short description, such as `Update weekly schedule`.
3. Select **Commit directly to the main branch**.
4. Click **Commit changes** again.

GitHub Pages will normally update within several minutes. The Raspberry Pi display reloads automatically every 15 minutes.

---

## Part 2: Update the weekly date badges

Each day has three editable lines:

```text
MON_MONTH: AUG
MON_DATE: 17
MON: Study hall · 10:00 a.m.–2:00 p.m.
```

- `MON_MONTH` is the small text at the top of the badge.
- `MON_DATE` is the large number.
- `MON` is the activity description.

Repeat the same pattern for Tuesday, Wednesday, and Thursday.

Update this line each week:

```text
WEEK_RANGE: Week of August 17
```

---

## Part 3: Update workshops and deadlines

Each workshop has three lines:

```text
WS1_WHEN: August 18 · 2:00 p.m. · SMSU South 116
WS1_NAME: Filing your FAFSA
WS1_NOTE: Bring your documents and leave with your application submitted.
```

Use `WS2` and `WS3` for the other two workshop cards.

The “Don’t Miss” panel uses:

```text
DEADLINE1: Fall classes begin August 24
DEADLINE2: Census deadline September 21
DEADLINE3: Complete your FAFSA as early as possible
```

Keep each item short enough to read from across the center.

---

## Part 4: Update contact information and ticker messages

Contact information appears near the welcome and “Start Here” screens:

```text
HOURS: Ask staff for current center hours
LOCATION: SMSU South 116
PHONE: (909) 537-4351
EMAIL: ProjectRebound@csusb.edu
SOCIAL: @csusbprojectrebound
STAFF_NAMES: Michael or Sofia
```

The four ticker messages rotate independently at the bottom:

```text
TICKER1: Growth. Resilience. Achievement. Building futures together.
TICKER2: Walk-ins are welcome—come in and meet the team.
TICKER3: Ask staff about food, transportation, financial aid, or emergency support.
TICKER4: You belong here. Your education and your future matter.
```

---

## Part 5: Add or replace a photograph

Only upload photographs approved for public display.

The two photographs currently shown are temporary Pexels stock examples. The people pictured are not Project Rebound students. Their source links are documented in `images/README.md`.

### Upload the file

1. Open the `images` folder.
2. Select **Add file → Upload files**.
3. Choose the image.
4. Use a short filename without spaces, such as `welcome-fall-2026.jpg`.
5. Commit the image directly to `main`.

### Connect the photograph to the display

Open `content.txt` and update:

```text
WELCOME_PHOTO: images/welcome-fall-2026.jpg
SPOTLIGHT_PHOTO: images/student-name.jpg
```

Replace the entire web address after `WELCOME_PHOTO:` or `SPOTLIGHT_PHOTO:`. Do not leave the old stock-photo URL on the same line.

Leave either line blank to show the designed Project Rebound placeholder.

Recommended:

- JPG, PNG, or WebP
- At least 1600 × 1200 pixels
- Landscape or moderately wide composition
- Clear subject with room around faces
- Authentic Project Rebound photographs rather than stock images

---

## Part 6: Create a student spotlight

Obtain written permission before publishing identifiable student information.

Edit:

```text
SPOTLIGHT_QUOTE: Education gave me a community and a future I could see for myself.
SPOTLIGHT_NAME: Student name
SPOTLIGHT_DETAIL: Sociology · Class of 2027
SPOTLIGHT_PHOTO: images/student-name.jpg
```

Keep the quotation in the student’s own voice. Two or three sentences is the recommended maximum.

Never include a student ID, personal phone number, private email address, supervision status, case information, or details about services received.

---

## Part 7: Understanding the separate code files

### `index.html`

This file contains the structure of the six television screens:

1. Welcome
2. This Week
3. Workshops
4. Support
5. Rebound Scholar Spotlight
6. Start Here

Edit this file only when adding, removing, or restructuring a screen.

### `styles.css`

This file controls:

- Project Rebound colors
- Typography
- Mountain silhouettes and paw prints
- Card layouts
- Spacing and sizing
- Photo frames
- QR-code panels
- Television scaling

Brand rules:

- Use Coyote Blue/Pantone 3005 C, lighter blue, white, deep navy, and black.
- Do not add gold, yellow, orange, or unrelated accent colors.
- Keep the design dignified, aspirational, readable, and Project Rebound-specific.

### `app.js`

This file controls:

- Loading `content.txt`
- Moving to the next slide every 14 seconds
- Previous/next controls
- Keyboard arrow navigation
- Clock and date
- Automatic refresh every 15 minutes

Do not edit this file for routine content changes.

### `content.txt`

This is the staff-editable file. It contains no HTML, CSS, or JavaScript.

---

## Part 8: Preview and verify an update

Live display:

https://mgriggs1989-web.github.io/project-rebound-center/

After committing:

1. Wait several minutes.
2. Open the live display.
3. Refresh the browser.
4. Use the small dots or arrow keys to review all six screens.
5. Confirm that text fits and QR codes remain visible.

If an update does not appear:

1. Open the repository’s **Actions** tab.
2. Look for the latest Pages deployment.
3. A green check means deployment succeeded.
4. A red X means the build failed; open it to view the error.
5. Confirm that every `content.txt` line still contains a colon.

---

## Part 9: Safe editing checklist

Before committing an update, confirm:

- All dates and times are accurate.
- No placeholder wording remains where current information is available.
- Student permission has been obtained.
- No FERPA-sensitive or private information appears.
- Photograph filenames match exactly, including capitalization.
- Project Rebound blue/white/navy/black branding remains intact.
- Text is concise enough to read from across the room.
- Links and QR-code destinations are still correct.

---

## Part 10: Recommended staff workflow

Assign one or two staff members as display editors.

Each week:

1. Update `WEEK_RANGE` and the four day/date entries.
2. Review the three deadlines.
3. Update workshop information.
4. Rotate one ticker message if needed.
5. Preview all six screens.

Each month:

1. Review contact information and QR-code destinations.
2. Replace the welcome photograph when an approved current image is available.
3. Update the Rebound Scholar spotlight with written permission.
4. Remove outdated event information.

For design or functionality changes, contact the webpage maintainer rather than modifying `styles.css` or `app.js` without review.
