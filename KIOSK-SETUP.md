# Raspberry Pi TV kiosk and automatic music

The page requests autoplay and retries automatically, but Chromium normally blocks audible autoplay unless it is launched with a kiosk autoplay policy. Use the setup below on the Raspberry Pi connected to the TV.

## 1. Test the display

Open Terminal on the Raspberry Pi and run:

```bash
chromium-browser --kiosk --autoplay-policy=no-user-gesture-required --noerrdialogs --disable-infobars https://mgriggs1989-web.github.io/project-rebound-center/
```

On newer Raspberry Pi OS releases the command may be named `chromium` instead of `chromium-browser`:

```bash
chromium --kiosk --autoplay-policy=no-user-gesture-required --noerrdialogs --disable-infobars https://mgriggs1989-web.github.io/project-rebound-center/
```

The music should begin after the playlist loads. Confirm that the TV itself is not muted and set the television volume before leaving the kiosk unattended.

## 2. Start it automatically after login

Run:

```bash
mkdir -p ~/.config/autostart
nano ~/.config/autostart/project-rebound-display.desktop
```

Paste this configuration, using `chromium` in `Exec` if that is the command that worked in step 1:

```ini
[Desktop Entry]
Type=Application
Name=Project Rebound Center Display
Exec=chromium-browser --kiosk --autoplay-policy=no-user-gesture-required --noerrdialogs --disable-infobars https://mgriggs1989-web.github.io/project-rebound-center/
Terminal=false
X-GNOME-Autostart-enabled=true
```

Save with `Ctrl+O`, press Enter, and exit with `Ctrl+X`. Reboot the Pi to test unattended startup.

## 3. Prevent the screen from sleeping

In Raspberry Pi Configuration, disable screen blanking. If that option is unavailable, add these flags to the Chromium `Exec` line:

```text
--disable-session-crashed-bubble --disable-features=Translate
```

Browser caveat: `autoplay` in HTML alone cannot override Chromium's audible-autoplay security policy. The `--autoplay-policy=no-user-gesture-required` launch flag is the part that makes unattended playback reliable.
