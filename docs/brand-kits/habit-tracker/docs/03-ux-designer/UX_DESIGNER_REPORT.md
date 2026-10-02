# UX Designer — Instruction Report

**Role goal:** make logging something take under 3 seconds and answering "when / how often" take one tap.

## 1. Personas

**Sarah, 34 — Hybrid worker, Austin TX**
Has to be in the office 3 days a week. HR asks for quarterly attendance. Wants to log office days fast and see "this quarter: 31".
*Frustration:* scrolling Google Calendar and counting by hand.

**Tom, 41 — Busy dad, Manchester UK**
Wants to call his parents more and remember car/house chores. Asks "when did I last…?" weekly.
*Frustration:* forgets until it's embarrassingly long.

**Léa, 27 — Self-improver, Lyon FR**
Gym, reading, language practice. Tried streak apps, quit when a streak broke.
*Frustration:* guilt mechanics; wants calm progress.

## 2. UX principles
1. **Log in 3 seconds.** Tap ＋ → tap topic → done. Today is the default date; Done is the default status for today/past.
2. **Answers above the fold.** The number the user came for is the biggest thing on screen.
3. **No guilt.** No broken-streak shaming. Missed planned items quietly ask "Did you do it?".
4. **Local by default.** Dates, week start and language feel native to US/UK/EU.
5. **Forgiving.** Every delete has Undo (5 s snackbar). Ranges show a preview before saving.

## 3. Information architecture

```
Bottom tabs:  Today | Calendar | Topics | Stats
Floating ＋ (on Today, Calendar, Topics) → Add entry sheet
Topics → Topic detail → Edit topic
Header ⚙ → Settings (Theme, Week start, Reminders, Backup, Privacy & analytics, About)
First launch → Onboarding (Welcome → Pick topics → Analytics consent)
```

## 4. Key flows (happy paths)

**F1 Quick log (C2):** Today → ＋ → tap "Gym" → sheet closes, toast "Gym logged · 9 this month" → **2 taps**.
**F2 Range (C3):** Calendar → long-press 1 Oct → drag to 3 Oct → sheet opens with range preselected → tap "Office" → Save → **3 interactions**. Alternative: ＋ → Range toggle → pick start/end.
**F3 Plan & tick (C4):** Calendar → tap Saturday → ＋ → "Friend's house" (Planned, because future) → Saturday morning, Today shows it → tap ✓.
**F4 History (C6/C7):** Topics → "Visited Mom" → big number "4 this year", "Last time 23 days ago", list of dates → change chip to "Last 3 months".
**F5 Compare (C7/C8):** Stats → period chips → ranked bars of all topics with counts.

Detailed step tables: `design/flows/user-flows.md`.

## 5. Interaction details
- **Period chips** (This month · 3 months · This year · Custom) are identical on Topic detail and Stats, and remember the last choice.
- **Tick** = 48dp hit area; animation: ring segment fills teal then check draws (400 ms). Haptic "light impact".
- **Day cell** shows up to 3 coloured dots; "+2" when more.
- **Empty states** always offer the next action: "No topics yet — pick from templates".
- **Past planned entries**: amber "Did you do it?" row with Yes / No (No deletes or keeps as missed — user choice).
- **Undo** for delete/archive via snackbar.

## 6. Usability test plan (run during the closed test)
**Participants:** 5 testers (at least 2 non-technical, 2 in US/CA, 2 in UK/EU).
**Tasks (time each, note errors):**
1. Create a topic "Office" and log it for today. *Target < 20 s first time*
2. Log "Office" for 6–8 of next week as Planned. *Target < 30 s*
3. Tell me how many times you went to the office this month. *Target < 5 s*
4. When did you last do X? *Target < 5 s*
5. Export your data. *Target < 30 s*
**Success:** ≥ 4 of 5 complete each task unaided. Anything below → redesign before launch.

**Post-test questions:** What was confusing? What would you track first? Would you recommend it (0–10)?

## 7. Accessibility checklist
- Contrast ≥ 4.5:1 text, ≥ 3:1 icons/indicators (tokens already checked)
- Never colour alone: dots also have topic icons in day sheet; Done also shows ✓
- TalkBack labels: "Office, Done, 1 October. Double-tap to mark planned."
- Font scaling 200%: numbers wrap, nothing clipped
- Calendar navigable by swipe and by previous/next buttons
- Reduce-motion setting disables tick animation
