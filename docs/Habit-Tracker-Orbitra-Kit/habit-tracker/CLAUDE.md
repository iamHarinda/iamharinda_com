# CLAUDE.md — Habit Tracker (com.orbitra.habittracker)

This file tells Claude (and any developer) how to work in this repository. Read it fully before changing code.

## What this app is

**Habit Tracker** by **Orbitra** — an offline-first Android app where users create custom topics (Office, Gym, Visited Mom…), add them to calendar days (single day or a date range), tick them off, and see **when, how often, and how long ago** they did each one, filtered by month / 3 months / year / custom range.

- Package: `com.orbitra.habittracker`
- Markets: US, Canada, UK, EU — **English only**
- Free, no ads, no accounts. User data never leaves the device (except anonymous, consented analytics events).
- Product spec: `PROJECT_PLAN.md`. Role docs: `docs/`. Designs: `design/screens/index.html`. Brand: `brand-kit/`.

## Core requirements — never break these

C1 custom topics · C2 add topic to a day · C3 add to a date range · C4 planned → done tick · C5 notes · C6 topic history (all dates) · C7 counts for this month / 3 months / year / custom · C8 totals visible without scrolling.

Any PR that touches entries, dates, or stats must keep the tests in `src/features/stats/__tests__` and `src/lib/dates/__tests__` green.

## Tech stack

Expo SDK (React Native) + TypeScript (strict) · Expo Router · expo-sqlite + Drizzle ORM · Zustand · react-native-calendars · victory-native · date-fns + expo-localization · expo-notifications · @react-native-firebase/analytics + crashlytics · Jest + React Native Testing Library · Maestro (E2E) · EAS Build/Submit.

## Commands

```bash
npm install                 # install deps
npx expo start              # dev server (needs a dev build because of Firebase)
npx expo run:android        # local dev build on device/emulator
npm run lint                # ESLint
npm run typecheck           # tsc --noEmit
npm test                    # Jest unit tests
npm run e2e                 # Maestro flows in e2e/
npm run db:generate         # Drizzle: create a migration from schema changes
eas build -p android --profile preview      # internal APK
eas build -p android --profile production   # signed AAB for Play
eas submit -p android --profile production  # upload to Play Console
```

## Folder structure

```
app/                     # Expo Router routes (screens only, thin)
  (tabs)/today.tsx
  (tabs)/calendar.tsx
  (tabs)/topics/index.tsx
  (tabs)/topics/[id].tsx
  (tabs)/stats.tsx
  settings/…
  onboarding/…
src/
  db/                    # schema.ts, client.ts, migrations/
  features/
    topics/              # hooks, components, repo
    entries/
    stats/               # period logic + count queries
    reminders/
    backup/              # CSV/JSON export, JSON import
    onboarding/
  lib/
    dates/               # ALL date helpers live here
    analytics/           # the only place that calls Firebase Analytics
    locale/
  components/            # shared UI (Button, Sheet, Chip, DayCell…)
  theme/                 # theme.ts from brand-kit/tokens
assets/                  # icons, fonts, splash (copied from brand-kit)
e2e/                     # Maestro flows
```

## Rules

### Dates (most bugs come from here)
- An entry's `date` is a **local calendar date string `YYYY-MM-DD`**. Never store it as a timestamp or convert it through UTC.
- Use only helpers from `src/lib/dates` (`todayLocal()`, `rangeDays(from, to)`, `periodRange('month'|'3m'|'year'|custom)`, `daysSince(date)`).
- Display formats come from the device locale (US → MM/DD, UK/EU → DD/MM). Week start comes from settings (default: locale).
- A range add (C3) creates one row per day sharing a `group_id`. Max range: 366 days.

### Data
- All DB access goes through feature `repo.ts` files. Screens never write SQL.
- Every schema change ships with a Drizzle migration. Never edit an old migration.
- Deleting a topic asks for confirmation and cascades its entries. Prefer "Archive".
- Counts only include `status = 'done'` unless a screen explicitly says "planned".

### Analytics & privacy (GDPR / UK GDPR / CCPA)
- Collection is **off until the user opts in** on the consent screen (`firebase.json` sets defaults to denied). Respect the toggle in Settings at all times.
- Call analytics only through `src/lib/analytics/track.ts`, using event names from `docs/09-analytics/events.json`. No ad-hoc event names.
- **Never send personal content**: no topic names, notes, dates of entries, or free text. Send only enums and counts (e.g. `template_id: "gym"`, `custom: true`, `range_days: 3`).
- No advertising ID (`AD_ID` permission is blocked). No ads SDKs. No third-party trackers.
- Keep the Play Data safety answers in `docs/07-devops/play-console-setup.md` in sync with what the code collects.

### UI
- Colours, type, spacing, radius only from `src/theme` — no hard-coded hex values in components.
- Text on Coral buttons is Ink `#0B1220` (accessible), never white.
- Touch targets ≥ 48dp. Every icon button has an `accessibilityLabel`.
- Support light and dark. Support font scaling up to 200% without clipping.
- Copy tone: calm, clear, encouraging. No guilt, no hype, max one "!" per screen.

### Code style
- TypeScript strict, no `any`. Functional components + hooks.
- Small files (< 250 lines). Name files in kebab-case, components in PascalCase.
- Tests next to code in `__tests__/`. New logic in `lib/` or `stats/` needs unit tests.
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`…). One feature per PR.

## Definition of done

1. Works offline, light + dark, small (360dp) and large screens
2. Lint, typecheck, unit tests pass; E2E for the touched flow passes
3. No new analytics events outside `events.json`
4. TalkBack reads the new UI sensibly
5. `CHANGELOG.md` updated

## Out of scope for v1 — do not build yet
Widgets, streaks, heatmap, recurring entries, share cards, money/duration fields, people tags, cloud backup, accounts, iOS build. These are planned for v1.1/v2 (see `PROJECT_PLAN.md` §3).
