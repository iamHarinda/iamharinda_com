# QA Tester — Instruction Report

**Role goal:** no wrong counts, no lost data, no crashes — and a closed test that Google accepts.

## 1. Test strategy

| Level | Tool | What | When |
|---|---|---|---|
| Unit | Jest | Date helpers, period ranges, stats queries, import/export | Every PR (CI) |
| Component | React Native Testing Library | Tick, chips, sheets, forms | Every PR (CI) |
| E2E | Maestro | Core flows F1–F5 on emulator | Nightly + before each release |
| Manual exploratory | Real phones | Feel, gestures, a11y, edge cases | Each sprint end |
| Closed test | Play Console + testers | Real-world use, 14 days | Nov 9–23 |

## 2. Device matrix (minimum)

| Device type | Android | Why |
|---|---|---|
| Pixel (emulator) | 16 | Latest OS, target SDK |
| Samsung Galaxy A-series (real) | 14–15 | Most common in US/EU |
| Small screen 360 dp (emulator) | 12 | Layout stress |
| Older low-RAM phone | 8.0 (API 26) | Minimum SDK performance |

Settings to cycle: light/dark · font size 200% · locale en-US and en-GB · week start Sun/Mon · 24h clock · TalkBack on · battery saver.

## 3. Core test cases (P0)

| ID | Req | Steps | Expected |
|---|---|---|---|
| TC-01 | C1 | Create topic "Office", choose colour, icon | Appears in Topics; persists after app restart |
| TC-02 | C1 | Name empty / 41 chars | Save disabled / limited to 40 |
| TC-03 | C2 | Calendar → today → add Office | Dot on today; Today screen shows it Done |
| TC-04 | C3 | Range 1–3 Oct Office | 3 entries; calendar dots on 3 days; count +3 |
| TC-05 | C3 | Range 1–5 Oct when 2 Oct already exists | "4 added, 1 already logged" |
| TC-06 | C3 | Range across month end 30 Sep–2 Oct | Sep count +1, Oct count +2 |
| TC-07 | C4 | Future day → add → status | Planned by default; not counted |
| TC-08 | C4 | Tick planned item | Done; count +1; animation; Undo works |
| TC-09 | C5 | Add note 500 chars, emoji | Saved and shown in history |
| TC-10 | C6 | Topic with 50 entries over 2 years | History newest first, grouped by month, smooth scroll |
| TC-11 | C7 | Switch This month / 3 months / Year / Custom | Counts match a hand-calculated sheet (fixture) |
| TC-12 | C7 | Custom range end before start | Prevented with clear message |
| TC-13 | C8 | Topic detail on 360 dp at 200% font | Count visible without scrolling |
| TC-14 | — | Last time with entry today | "Today" (not "0 days ago") |
| TC-15 | — | Delete topic | Confirm dialog; entries removed; Undo restores |
| TC-16 | — | Export CSV/JSON → wipe app → import JSON | All topics/entries/notes restored; counts identical |
| TC-17 | — | Locale en-US vs en-GB | 10/01/2026 vs 01/10/2026; week starts Sun vs Mon |
| TC-18 | — | Change device timezone after logging | Entry stays on the same calendar date |
| TC-19 | — | Airplane mode all flows | Everything works |
| TC-20 | Privacy | Decline analytics → use app | **Zero** events in Firebase DebugView |
| TC-21 | Privacy | Accept analytics → log entry | `entry_added` arrives with no topic name/note/date |
| TC-22 | — | Reminder 08:00 → reboot phone | Reminder still fires |

Keep a fixture file `e2e/fixtures/known-counts.json` with 120 entries and the expected counts for each period — TC-11 compares against it.

## 4. Bug reporting

```
Title: [Area] Short description
Severity: P0 (data loss / wrong count / crash) · P1 (feature broken) · P2 (UI) · P3 (polish)
Device / Android / app version:
Steps:
Expected:
Actual:
Screenshot / screen recording:
```
**Release rule:** zero open P0, zero open P1 in core flows (C1–C8).

## 5. Closed-test playbook (Google requirement for new personal accounts)
1. Recruit 18–20 testers (spare capacity for drop-outs). Collect Gmail addresses.
2. Play Console → Testing → **Closed testing** → create track "beta" → add testers via email list or Google Group.
3. Send each tester: opt-in link + 3 steps + what to try (a checklist of 6 tasks).
4. **Daily:** confirm ≥ 12 opted in. A tester who leaves and rejoins restarts at zero.
5. Encourage real use: ask testers to log at least 3 real things per week and open the app every few days.
6. Collect feedback with a Google Form: *What did you track? What confused you? Any bugs? Rate 1–5. Would you keep using it?*
7. Ship at least one updated closed-test build that fixes reported issues — it shows Google the test was real.
8. Keep a log (dates, tester count, builds, fixes) to answer the production-access questionnaire.

## 6. Release regression checklist
- [ ] TC-01…TC-22 pass on 2 devices
- [ ] Maestro suite green
- [ ] Fresh install + upgrade from previous build (DB migration) both OK
- [ ] Crash-free sessions in closed test ≥ 99.5%
- [ ] Store listing text matches app behaviour
