# DevOps — Instruction Report

**Role goal:** one-command, repeatable, signed releases to Google Play, with no secrets in Git.

## 1. Accounts to create (Phase 0, Oct 1–4)

| Account | Name / ID | Notes |
|---|---|---|
| Google Play Console | Developer name **Orbitra** | One-time US$25. See `play-console-setup.md` for personal vs organisation |
| Expo / EAS | Owner **orbitra** | Free tier is enough to start (limited builds/month) |
| Firebase | Project **habit-tracker** (org: Orbitra) | Android app `com.orbitra.habittracker`; GA4 property auto-created |
| GitHub | Org **orbitra**, repo **habit-tracker** (private) | Branch protection on `main` |
| Domain | **orbitra.app** (or orbitra.co if taken) | For website, privacy policy, support email |
| Hosting | Cloudflare Pages | Static site: `/`, `/habit-tracker`, `/habit-tracker/privacy` |
| Email | support@ / privacy@orbitra.app | Cloudflare Email Routing → your Gmail |

## 2. Environments & build profiles

| Profile | Output | Distribution | Analytics |
|---|---|---|---|
| `development` | Dev client APK | Your phone | Firebase DebugView |
| `preview` | APK | Internal testers / QA | Debug |
| `production` | **AAB**, auto-increment versionCode | Play Console (internal → closed → production) | Live |

`eas.json` (repo root):
```json
{
  "cli": { "version": ">= 16.0.0", "appVersionSource": "remote" },
  "build": {
    "development": { "developmentClient": true, "distribution": "internal", "android": { "buildType": "apk" } },
    "preview":     { "distribution": "internal", "android": { "buildType": "apk" }, "channel": "preview" },
    "production":  { "autoIncrement": true, "android": { "buildType": "app-bundle" }, "channel": "production" }
  },
  "submit": {
    "production": {
      "android": { "serviceAccountKeyPath": "./secrets/play-service-account.json", "track": "internal", "releaseStatus": "draft" }
    }
  }
}
```

## 3. Secrets (never commit)
- `google-services.json` → EAS secret file: `eas env:create --name GOOGLE_SERVICES_JSON --type file --value ./google-services.json --visibility secret`, and reference it in `app.config.ts`.
- Play service account JSON → EAS Submit credentials (or GitHub secret for CI).
- Upload keystore → **let EAS generate and store it**; enable **Play App Signing** (Google holds the app signing key). Download a backup of the upload key to an offline drive.
- `.gitignore`: `google-services.json`, `secrets/`, `*.jks`, `*.keystore`, `.env*`.

## 4. CI — GitHub Actions
`.github/workflows/ci.yml` (runs on every PR and push to `main`):
```yaml
name: CI
on: [pull_request, push]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test -- --ci --coverage
```
`.github/workflows/release.yml` (manual trigger or tag `v*`):
```yaml
name: Release
on:
  workflow_dispatch:
  push: { tags: ['v*'] }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - uses: expo/expo-github-action@v8
        with: { eas-version: latest, token: '${{ secrets.EXPO_TOKEN }}' }
      - run: npm ci
      - run: eas build -p android --profile production --non-interactive --auto-submit
```

## 5. Branching & versioning
- `main` = always releasable. Feature branches `feat/…`, `fix/…`; PR + green CI to merge.
- SemVer in `app.json` (`1.0.0`); `versionCode` auto-incremented by EAS.
- Tag every store release `v1.0.0`; write `CHANGELOG.md`; Play "What's new" text comes from it.

## 6. Release pipeline

```
PR → CI green → merge main → tag vX.Y.Z → EAS build (AAB) → EAS submit → Play "Internal testing"
   → smoke test on your phone → promote to "Closed testing" (beta) → after approval → "Production"
   → staged rollout 20% → 50% → 100% (watch Crashlytics + Android vitals 24–48 h each step)
```

## 7. Play Console technical requirements (verify at release time)
- **Target API level:** Google raises the minimum each year (around 31 August). `app.json` targets API 36; re-check the current requirement in Play Console → Policy status before each release.
- AAB only (no APK uploads for new apps).
- 64-bit native libs (Expo default).
- `POST_NOTIFICATIONS` runtime permission request on Android 13+ (only when the user sets a reminder).
- Exact alarms: request `SCHEDULE_EXACT_ALARM` only if reminders must be exact; otherwise use inexact.

## 8. Monitoring
- **Crashlytics** (consent-gated) + **Android vitals** in Play Console: crash rate < 1.09% and ANR < 0.47% (bad-behaviour thresholds).
- Weekly: review vitals, ratings, reviews; reply to every review within 48 h.

## 9. Website (Cloudflare Pages)
- `orbitra.app/` — studio page with app list
- `orbitra.app/habit-tracker` — landing page (SEO, Play badge, screenshots)
- `orbitra.app/habit-tracker/privacy` — privacy policy (required by Play)
- `orbitra.app/habit-tracker/delete-data` — explains that all data is on device + how to delete (useful for Data safety)
- Deploy from a separate repo `orbitra/website` on push to `main`.
