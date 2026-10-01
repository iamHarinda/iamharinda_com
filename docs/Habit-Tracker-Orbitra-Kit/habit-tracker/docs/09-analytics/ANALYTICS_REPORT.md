# Analytics — Google Analytics 4 (via Firebase) Instruction Report

**Role goal:** learn how people use Habit Tracker so we can improve it — without collecting anything personal, and only with consent.

## 1. Why Firebase, not the web GA tag
Android apps send data to **Google Analytics 4** through the **Firebase SDK**. One Firebase project = one GA4 property with an Android data stream. You view everything in **analytics.google.com** (GA4) or the Firebase console.

## 2. Setup checklist
1. Firebase console → *Add project* **habit-tracker** → enable Google Analytics → create GA4 account **Orbitra**, property **Habit Tracker**.
2. GA4 property settings:
   - Reporting time zone: **America/New_York** (main market) · Currency: **USD**
   - Data retention: **14 months**
   - Google signals: **OFF**
   - Ads personalization: **OFF** for all regions
   - Granular location & device data collection: **OFF** for EEA/UK
3. Add Android app `com.orbitra.habittracker` → download `google-services.json` (EAS secret).
4. Install `@react-native-firebase/app`, `/analytics`, `/crashlytics`; copy `brand-kit/tokens/firebase.json` (collection **off** by default).
5. Implement `src/lib/analytics/track.ts` (see Full-stack report §6).
6. Mark **key events**: `onboarding_completed`, `entry_added`.
7. Test with DebugView: `adb shell setprop debug.firebase.analytics.app com.orbitra.habittracker`.
8. Link **Google Play** to Firebase (Project settings → Integrations) to see install sources.

## 3. Consent (GDPR / UK GDPR / ePrivacy / CCPA)
- Onboarding step 3 asks plainly:
  > **Help improve Habit Tracker?**
  > Share anonymous usage statistics (like which screens you use). We never see your topics, notes or dates.
  > **[ Share anonymous stats ]**   **[ No thanks ]**
- Both buttons equal size and weight (no dark patterns). Same choice for every country — simpler and fully compliant.
- Settings → Privacy & analytics → toggle, with the same text.
- Consent Mode v2 values: `analytics_storage` = user choice; `ad_storage`, `ad_user_data`, `ad_personalization` = **always denied**.
- Advertising ID: not collected (`AD_ID` permission blocked, `google_analytics_adid_collection_enabled=false`).

## 4. Event plan
Single source: `events.json`. Developers must not invent events. Summary:

| Question we want answered | Events |
|---|---|
| Do people finish onboarding? | `onboarding_started` → `onboarding_completed` |
| Which templates matter? | `topic_created.template_id` |
| Is range-add (C3) used? | `entry_added.mode = range`, `range_days` |
| Do people plan ahead and tick (C4)? | `entry_added.status = planned` → `entry_checked` |
| Is counting (C7) the core value? | `history_viewed`, `stats_viewed`, `period_changed.period` |
| Does "Last time" get used? | `last_time_viewed` |
| Do reminders help retention? | `reminder_set` + user property `reminders_on` |
| Do people trust the data? | `export_completed` |

## 5. GA4 reports to build (Explore)
1. **Activation funnel:** first_open → onboarding_completed → topic_created → entry_added → entry_added (day 2+)
2. **Retention cohort:** weekly cohorts by first_open; segment by `reminders_on`
3. **Feature usage:** event count by `entry_added.mode`, `period_changed.period`, `template_id`
4. **Acquisition:** first_open by source (Play referrer + UTM from website)
5. **Stability:** Crashlytics crash-free users (target ≥ 99.5%)

Register custom dimensions in GA4 (Admin → Custom definitions) for: `mode`, `status`, `period`, `template_id`, `source`, `surface`, `format`.

## 6. Weekly analytics ritual (15 min, Mondays)
- Activation rate (onboarding_completed ÷ first_open) — target ≥ 70%
- D1 / D7 / D30 retention — targets 35% / 18% / 12%
- Top 3 templates and least-used feature
- One decision for the week (write it in the PM log)

## 7. Privacy policy must say
- What's stored on device (topics, entries, notes, reminders) — never uploaded
- What's collected only with consent (usage events, crash logs, app instance ID) via Google Firebase / Google Analytics
- No ads, no selling of data, no advertising ID
- How to turn it off, how to request deletion, contact `privacy@orbitra.app`
- Rights for EU/UK (GDPR) and California (CCPA/CPRA) users

Draft: `privacy-policy-draft.md` (have it reviewed — this is not legal advice).
