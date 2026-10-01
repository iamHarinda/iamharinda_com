# Habit Tracker — Project Plan

| | |
|---|---|
| **App name** | Habit Tracker |
| **Play Store title** | Habit Tracker & Day Counter |
| **Package** | `com.orbitra.habittracker` |
| **Developer account** | Orbitra |
| **Platform** | Android (Google Play) — iOS later from the same codebase |
| **Markets** | United States, Canada, United Kingdom, European Union |
| **Language** | English only |
| **Business model** | Free. No ads. No in-app purchases in v1. |
| **Analytics** | Google Analytics 4 via Firebase (consent-gated) |
| **Plan date** | 1 October 2026 |
| **Target launch** | Early December 2026 (ahead of New Year's resolution season) |

---

## 1. Product vision

> **Log anything you do. See when, how often, and how long ago.**

Most habit apps ask "did you do it today?". Habit Tracker answers the questions people actually ask later:

- *When did I last visit Mom?*
- *How many office days did I have this month?*
- *How many times did I go to the gym this year — and on which dates?*

The user creates their own **topics**, adds them to days on a **calendar** (single day or a range), **ticks them off**, and gets instant **counts** for any period.

## 2. Non-negotiable core requirements (v1)

These come straight from the founder's brief. Every release must keep them working.

| # | Requirement | Acceptance in one line |
|---|---|---|
| C1 | Create any custom topic | Name + colour + icon; unlimited topics |
| C2 | Add a topic to a day on the calendar | Tap a day → pick topic(s) → saved |
| C3 | Add a topic to a **date range** | "Office, 1–3 Oct" creates 3 entries in one action |
| C4 | Plan ahead and **tick off** | Entries are *Planned* or *Done*; one tap toggles |
| C5 | Note on any entry | "Gave John $50" |
| C6 | Topic history | Open a topic → every date it happened, newest first |
| C7 | Counts by period | This month · Last 3 months · This year · Custom range |
| C8 | Easy counting | Totals visible without scrolling; per-month breakdown |

## 3. Scope by release

### v1.0 — Launch (MVP)
- C1–C8 above
- **"Last time" view** — "Haircut · 41 days ago"
- Today screen with quick tick
- Topic templates (Office, Gym, Visited family, Date night, Doctor, Haircut, Read, Meditate…)
- Reminders (local notifications)
- Locale-aware dates (MM/DD vs DD/MM), week start (Sun/Mon), 12h/24h
- Light / dark mode (system default)
- Export to CSV and JSON; import from JSON backup
- Analytics consent screen (GDPR / UK GDPR) + GA4 events
- Accessibility: TalkBack labels, dynamic font size, 48dp touch targets

### v1.1 — Engagement (≈4 weeks after launch)
- Home-screen widget (quick tick)
- Streaks and a full-year heatmap
- Recurring entries ("every weekday")
- Share card ("My 2026 in numbers")

### v2.0 — Power features
- Amount field (money) and duration field (hours) with totals
- People tags ("with whom / for whom")
- Google Drive auto-backup
- Biometric lock
- iOS release

## 4. Tech stack

| Layer | Choice | Why |
|---|---|---|
| App framework | **Expo SDK (React Native) + TypeScript** | Founder is a web developer; one codebase for Android now, iOS later |
| Navigation | Expo Router | File-based routes, typed |
| Database | **expo-sqlite** + Drizzle ORM | Offline, fast GROUP BY counts, migrations |
| State | Zustand (UI state) + live SQLite queries | Small and simple |
| Calendar UI | react-native-calendars | Month grid, range marking, dots |
| Charts | victory-native (Skia) | Smooth, themeable |
| Dates | date-fns + expo-localization | Locale-aware formats and week start |
| Notifications | expo-notifications | Local reminders |
| Analytics | @react-native-firebase/analytics (GA4) | Requested by founder; free |
| Crash reporting | Firebase Crashlytics (consent-gated) | Same Firebase project |
| Build & release | EAS Build + EAS Submit | Signed AAB to Play Console |
| CI | GitHub Actions | Lint, type-check, tests on every PR |

## 5. Data model

```sql
CREATE TABLE topics (
  id          TEXT PRIMARY KEY,          -- uuid
  name        TEXT NOT NULL,
  color       TEXT NOT NULL,             -- one of topicPalette
  icon        TEXT NOT NULL,             -- icon name
  archived    INTEGER NOT NULL DEFAULT 0,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

CREATE TABLE entries (
  id          TEXT PRIMARY KEY,
  topic_id    TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  date        TEXT NOT NULL,             -- local calendar date 'YYYY-MM-DD' (never a UTC timestamp)
  status      TEXT NOT NULL CHECK (status IN ('planned','done')),
  note        TEXT,
  group_id    TEXT,                      -- shared by all days created in one range action
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);
CREATE INDEX idx_entries_topic_date ON entries(topic_id, date);
CREATE INDEX idx_entries_date ON entries(date);

CREATE TABLE reminders (
  id          TEXT PRIMARY KEY,
  topic_id    TEXT REFERENCES topics(id) ON DELETE CASCADE,
  time        TEXT NOT NULL,             -- 'HH:mm' local
  days        TEXT NOT NULL,             -- '1,2,3,4,5'
  enabled     INTEGER NOT NULL DEFAULT 1
);
```

**The key query** (powers C7/C8):

```sql
SELECT t.id, t.name, t.color, COUNT(e.id) AS times, MAX(e.date) AS last_date
FROM topics t
LEFT JOIN entries e
  ON e.topic_id = t.id AND e.status = 'done' AND e.date BETWEEN :from AND :to
WHERE t.archived = 0
GROUP BY t.id
ORDER BY times DESC;
```

## 6. Screens

1. **Onboarding** (3 steps): welcome → pick starter topics → analytics consent
2. **Today** — today's planned + done items, one-tap tick, "Last time" strip
3. **Calendar** — month grid with topic-colour dots; tap day → day sheet; long-press-drag for ranges
4. **Add entry sheet** — topic picker, single day / range toggle, planned/done, note
5. **Topics** — list with this-month count and "last time"
6. **Topic detail** — period filter, big count, per-month bars, full date history
7. **Stats** — period filter, ranked totals for all topics
8. **Settings** — theme, week start, reminders, export/import, privacy & analytics, about

Full designs: `design/screens/index.html`. Flows: `design/flows/user-flows.md`.

## 7. Timeline

| Phase | Dates (2026) | Output |
|---|---|---|
| 0 · Setup | Oct 1 – Oct 4 | Play Console "Orbitra" account, Firebase project, domain, repo, privacy policy draft |
| Sprint 1 · Foundation | Oct 5 – Oct 11 | Expo app, theme, DB + migrations, Topics CRUD |
| Sprint 2 · Logging | Oct 12 – Oct 18 | Today, Calendar, Add entry (single + range), tick, notes |
| Sprint 3 · Insights | Oct 19 – Oct 25 | Topic detail history, Last time, Stats with period filters |
| Sprint 4 · Complete | Oct 26 – Nov 1 | Onboarding + templates, reminders, settings, export/import, consent + GA4 |
| Sprint 5 · Polish | Nov 2 – Nov 8 | Accessibility, dark mode pass, performance, QA regression, store assets |
| Closed test | Nov 9 – Nov 23 | ≥12 testers opted in for 14 continuous days (new personal accounts) |
| Production review | Nov 24 – Dec 1 | Apply for production access → store review |
| **Launch** | **~Dec 1 – Dec 5** | Public on Google Play (US, CA, UK, EU) |
| v1.1 | Dec – mid-Jan | Widget, streaks, heatmap, recurring — ship before the January peak |

> **Why early December matters:** searches for habit trackers peak around New Year's resolutions. Launching in December lets the app collect reviews before that peak.

## 8. Team roles (one person, eight hats)

The founder covers every role. Each role has its own instruction report in `docs/`:

| Folder | Role | Owns |
|---|---|---|
| `docs/01-project-manager` | Project Manager | Timeline, backlog, risks, weekly rhythm |
| `docs/02-business-analyst` | Business Analyst | Requirements, user stories, acceptance criteria, competitors |
| `docs/03-ux-designer` | UX Designer | Personas, journeys, flows, usability tests |
| `docs/04-ui-designer` | UI Designer | Visual system, components, screen specs |
| `docs/05-fullstack-developer` | Full-stack Developer | Architecture, code, DB, analytics wiring |
| `docs/06-qa-tester` | QA Tester | Test plan, test cases, closed-test management |
| `docs/07-devops` | DevOps | CI/CD, EAS builds, signing, releases, Play Console |
| `docs/08-seo-digital-marketing` | SEO / Digital Marketer | ASO, store listing, website SEO, social, launch |
| `docs/09-analytics` | Analytics | GA4 event plan, consent, dashboards |

## 9. Success metrics (first 90 days)

| Metric | Target |
|---|---|
| Installs | 5,000 |
| Day-1 retention | ≥ 35% |
| Day-30 retention | ≥ 12% |
| Users who create ≥ 3 topics | ≥ 50% of activated users |
| Store rating | ≥ 4.5 ★ |
| Crash-free users | ≥ 99.5% |

## 10. Top risks

| Risk | Impact | Mitigation |
|---|---|---|
| Can't find 12 reliable closed testers | Launch slips | Recruit 18–20 from friends, family, Fiverr clients, tester communities now |
| Crowded habit-tracker market | Low visibility | Position on "when / how often / days since", not streaks |
| GDPR complaints about analytics | Removal, trust loss | Consent screen, no personal content in events, honest Data safety form |
| Timezone/date bugs | Wrong counts | Store local `YYYY-MM-DD` strings; dedicated date test suite |
| Scope creep | Misses December | v1 scope frozen after Sprint 1; new ideas go to v1.1 backlog |
