# Business Analyst — Instruction Report

**Role goal:** turn the founder's idea into precise, testable requirements so that nothing in C1–C8 is ambiguous.

## 1. Problem statement
People repeatedly do things — go to the office, visit friends, give money, see a doctor — but can't easily answer *"when did I last…?"*, *"how many times this month?"* or *"which dates?"*. Calendars show the future, not totals. Habit apps track daily streaks, not irregular life events.

## 2. Target users (US / CA / UK / EU)

| Segment | Example need | Size signal |
|---|---|---|
| Hybrid workers | "How many office days this quarter?" (many employers require 2–3/week) | Very large in US/UK post-2020 |
| Family-minded adults | "When did I last call/visit Mom?" | Universal |
| Self-improvers | Gym, reading, meditation counts | Core habit-tracker audience |
| Life admin | Haircut, car wash, dentist, filter change — "days since" | Strong "days since" search demand |
| Money lenders/givers | "Gave John $50" — dates and notes | Niche, sticky |

## 3. Competitor scan

| App type | Examples | Strength | Gap we fill |
|---|---|---|---|
| Streak habit trackers | Loop, HabitBox, Habitica | Daily habits, streaks | Weak for irregular events and "how many this month" |
| Day counters | Day Counter, Since, Days Since | "Days since" one event | One counter per event; no calendar log or period totals |
| Mood journals | Daylio | Rich daily journal | Mood-first; counting is secondary |
| Calendars | Google Calendar | Scheduling | No totals, no ticking, no history per topic |

**Positioning:** *the calendar log that counts.* Habit-tracker discoverability + day-counter usefulness + period totals nobody else shows well.

## 4. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | User can create a topic with name (1–40 chars), colour (12 options), icon | P0 |
| FR-02 | User can edit, archive, unarchive, delete a topic (delete confirms and removes entries) | P0 |
| FR-03 | User can add one or more topics to a selected day | P0 |
| FR-04 | User can add a topic to a continuous date range (2–366 days) in one action | P0 |
| FR-05 | Each entry has status Planned or Done; one tap toggles | P0 |
| FR-06 | Entries dated in the future default to Planned; today/past default to Done | P0 |
| FR-07 | User can add/edit a note (≤ 500 chars) on an entry | P0 |
| FR-08 | Topic detail lists every Done date, newest first, with notes | P0 |
| FR-09 | Period filter: This month, Last 3 months, This year, Custom (from–to) | P0 |
| FR-10 | Topic detail and Stats show the count for the selected period above the fold | P0 |
| FR-11 | "Last time" shows days since the latest Done entry per topic | P0 |
| FR-12 | Topic detail shows per-month counts (bar chart) for the selected period | P1 |
| FR-13 | Today screen lists today's planned and done entries with one-tap tick | P0 |
| FR-14 | Starter templates on onboarding | P1 |
| FR-15 | Reminders per topic or a global daily reminder | P1 |
| FR-16 | Export all data as CSV and JSON; import JSON backup | P0 |
| FR-17 | Analytics opt-in screen; toggle in Settings | P0 |
| FR-18 | Dates/week start/time format follow locale; user can override week start | P0 |

## 5. Non-functional requirements
- **Offline:** 100% of features work without internet.
- **Performance:** cold start < 2 s on a mid-range phone; stats for 10,000 entries in < 300 ms.
- **Privacy:** no account; no personal content leaves the device.
- **Accessibility:** WCAG 2.2 AA contrast; TalkBack; font scale 200%.
- **Reliability:** crash-free users ≥ 99.5%.
- **Data safety:** export never loses notes or planned entries; import is idempotent.

## 6. User stories with acceptance criteria (Gherkin)

**US-03 Add a date range (C3)**
```
Given I have a topic "Office"
When I open Add entry, choose "Range", pick 1 Oct → 3 Oct and save
Then 3 entries for "Office" exist on 1, 2 and 3 Oct
And the calendar shows an Office dot on each of those days
And "This month" count for Office increases by 3 (if marked Done)
```

**US-04 Tick a planned entry (C4)**
```
Given "Friend's house" is Planned for today
When I tap its check on the Today screen
Then its status becomes Done
And the check animates and the item moves to "Done today"
And the count for this month increases by 1
```

**US-06 See topic history (C6)**
```
Given "Visited Mom" has Done entries on 3 Jan, 20 Feb and 14 Mar
When I open the Visited Mom topic
Then I see 14 Mar, 20 Feb, 3 Jan listed newest first
And "Last time" shows the number of days since 14 Mar
```

**US-07 Count by period (C7)**
```
Given Office has Done entries on 2 Sep, 15 Sep and 1 Oct (today is 5 Oct)
When I select "This month"   Then Office count is 1
When I select "Last 3 months" Then Office count is 3
When I select Custom 1 Sep–30 Sep Then Office count is 2
```

**Edge cases to specify and test**
- Same topic added twice to the same day → allowed? **Decision: no**; second add opens the existing entry.
- Range overlapping existing entries → skip existing days, show "2 added, 1 already logged".
- Planned entries in the past → shown with a "Did you do it?" prompt; never counted until Done.
- Leap day, DST change days, travelling across timezones → date strings stay as logged.
- Archived topics → hidden from Today/Stats; history kept; included in exports.

## 7. Glossary
| Term | Meaning |
|---|---|
| Topic | A thing the user tracks (Office, Gym) |
| Entry | One topic on one date |
| Planned / Done | Entry status; only Done is counted |
| Range add | One action creating entries on consecutive days |
| Period | Date window used for counts |
| Last time | Days since the most recent Done entry |
