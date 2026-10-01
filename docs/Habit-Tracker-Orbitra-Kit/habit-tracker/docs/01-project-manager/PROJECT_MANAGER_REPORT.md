# Project Manager — Instruction Report

**Role goal:** ship Habit Tracker v1.0 to Google Play by early December 2026 without dropping any core requirement (C1–C8).

## 1. Your responsibilities
- Own the timeline in `PROJECT_PLAN.md` §7 and keep it honest.
- Keep one prioritised backlog (GitHub Projects board: *Backlog → This sprint → In progress → Review → Done*).
- Run the weekly rhythm below, even as a solo founder — it is how you avoid drifting.
- Guard scope: v1 is frozen after Sprint 1. New ideas go to the `v1.1` column.
- Track risks weekly and act early.

## 2. Weekly rhythm (solo version)

| Day | 15–30 min ritual |
|---|---|
| Monday | **Sprint planning** — pick stories for the week from the top of the backlog. Max 5. |
| Daily | **Check-in note** (3 lines in `docs/01-project-manager/log.md`): done yesterday / doing today / blocked by |
| Friday | **Demo to yourself** — record a 2-min screen video of what works. **Retro**: 1 thing to keep, 1 to change. |

## 3. Milestones & gates

| Milestone | Date | Gate (must be true to pass) |
|---|---|---|
| M0 Accounts ready | Oct 4 | Play Console "Orbitra" verified, Firebase project created, repo created |
| M1 Foundation | Oct 11 | App runs on a real phone; topics can be created and persist |
| M2 Logging | Oct 18 | C2, C3, C4, C5 work end-to-end |
| M3 Insights | Oct 25 | C6, C7, C8 + "Last time" work; date test suite passes |
| M4 Feature complete | Nov 1 | Everything in v1 scope works; no P0 bugs |
| M5 Release candidate | Nov 8 | QA regression passed; store listing + assets uploaded; privacy policy live |
| M6 Closed test done | Nov 23 | ≥12 testers opted in 14 continuous days; feedback triaged |
| M7 Launch | ~Dec 1–5 | Production approved and live in US, CA, UK, EU |

## 4. Backlog (v1 epics → stories)

**E1 Foundation** — Expo project & tooling · theme from brand kit · SQLite + migrations · navigation tabs
**E2 Topics** — create / edit / archive / delete topic · colour & icon picker · reorder
**E3 Entries** — add to a day · add to a range · planned/done toggle · note · edit / delete entry
**E4 Calendar** — month grid with dots · day sheet · range selection
**E5 Insights** — topic detail history · last time · period filter · stats screen · per-month bars
**E6 Onboarding** — welcome · templates · consent
**E7 Settings** — theme · week start · reminders · export CSV/JSON · import JSON · privacy
**E8 Analytics** — consent gate · events from `events.json` · Crashlytics
**E9 Release** — store listing · screenshots · privacy policy page · closed test · production

Priority labels: **P0** must ship (C1–C8, consent, export) · **P1** should ship · **P2** v1.1.

## 5. Risk register

| ID | Risk | Likelihood | Impact | Owner action |
|---|---|---|---|---|
| R1 | Fewer than 12 active testers for 14 days | High | High | Start recruiting **this week**: target 18–20. Message them on day 1, 7, 12. |
| R2 | Play Console identity verification delay | Medium | High | Create account on day 1; use exact legal name + ID |
| R3 | Date/timezone bugs give wrong counts | Medium | High | Date helpers + tests in Sprint 1 before any UI |
| R4 | Firebase native setup breaks Expo Go | High | Low | Use a dev build from the start (`expo run:android`) |
| R5 | Scope creep (widgets, streaks) | High | Medium | Freeze scope; v1.1 column |
| R6 | Store rejection (policy, Data safety mismatch) | Low | High | DevOps checklist; honest Data safety; no "free/best/#1" in title |
| R7 | Burnout — one person, eight roles | Medium | High | Max 5 stories/week; one full day off weekly |

## 6. Closed-test management plan (critical path)
1. **Now:** build a tester list (name, Gmail, Android phone model). Aim 18–20 people.
2. **Nov 8:** upload RC to *Closed testing*; add the Google Group or email list.
3. **Nov 9:** send the opt-in link with a 3-step guide (open link → Join → install from Play).
4. **Daily:** check Play Console → Testers count stays ≥12. Replace drop-outs fast (their clock restarts).
5. Ask testers to **open the app at least every 2–3 days** and log real things — Google reviews engagement.
6. Collect feedback with a short Google Form (5 questions). Fix P0s in a new closed-test build.
7. **Day 15:** apply for production access; answer the questionnaire with specifics (what testers found, what you fixed).

## 7. Status report template (Fridays)

```
Week: __  Sprint goal: ________________
Done: …
Not done (why): …
Risks changed: …
Next week: …
Launch date still realistic? Yes / No — because …
```
