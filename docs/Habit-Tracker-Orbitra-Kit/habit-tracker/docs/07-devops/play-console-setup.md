# Play Console Setup — Developer account "Orbitra"

## 1. Choose the account type

| | **Personal account** | **Organisation account** |
|---|---|---|
| Needs | Your legal ID, phone, payment card | Registered business + **D-U-N-S number** (free, can take weeks) |
| Public developer name | **Orbitra** (you choose the display name) | **Orbitra** (must match the registered business) |
| 12 testers × 14 days closed test | **Required** before production | Not required |
| Time to first public release | ≈ 3 weeks after RC | Faster once verified |
| Recommendation | ✅ Start now — fastest path to a December launch | Consider later when Orbitra is a registered business |

> Google verifies your legal identity privately; the store shows the developer name **Orbitra**. Use exactly the name on your ID during verification to avoid delays.

## 2. Step by step (personal)
1. Go to play.google.com/console → sign in with a **new Google account** made for the business (e.g. `orbitra.apps@gmail.com`) — keeps business separate from personal.
2. Choose **"Yourself"** → pay US$25 → complete identity verification.
3. Developer profile → **Developer name: Orbitra** · Website: `https://orbitra.app` · Contact email: `support@orbitra.app`.
4. Verify the contact phone and email; add your Android device in the Play Console app (device verification).
5. Create app → Name **Habit Tracker** · Default language **English (United States) – en-US** · App · Free.
6. Set up **Play App Signing** (default) when uploading the first AAB.

## 3. Store listing (copy from `docs/08-seo-digital-marketing`)
- App name/title: **Habit Tracker & Day Counter** (27/30)
- Short description (80/80): *Day counter, activity log & days since tracker. Count how often you do anything.*
- Full description: see SEO report
- App icon: `brand-kit/play-store/play-store-icon-512.png`
- Feature graphic: `brand-kit/play-store/feature-graphic-1024x500.png`
- Phone screenshots: 6 × 1080×1920 (see SEO report)
- Category: **Productivity** · Tags: Habit tracker, Calendar, Productivity
- Add an **en-GB** listing too (same text, "colour" spelling) for UK/EU.

## 4. App content declarations

| Section | Answer |
|---|---|
| Privacy policy | `https://orbitra.app/habit-tracker/privacy` |
| Ads | **No**, the app contains no ads |
| App access | All functionality available without login |
| Content rating (IARC) | Utility/productivity, no user-to-user content → expected **Everyone / PEGI 3** |
| Target audience | **18 and over** (keeps the app outside the Families policy; revisit later if needed) |
| News app | No |
| Government app | No |
| Financial features | None |
| Health apps declaration | Not a health app |
| Data safety | See §5 |

## 5. Data safety form (must match the code — keep in sync)

**Does your app collect or share user data?** Yes (only if the user consents to analytics)

| Data type | Collected | Shared | Optional? | Purpose |
|---|---|---|---|---|
| App activity → App interactions | Yes | No | **Yes** (consent) | Analytics |
| App info & performance → Crash logs, Diagnostics | Yes | No | **Yes** (consent) | App functionality, Analytics |
| Device or other IDs (Firebase app instance ID) | Yes | No | **Yes** (consent) | Analytics |
| Personal info, location, contacts, messages, photos, health, financial info | **No** | No | — | — |

- Data is encrypted in transit: **Yes**
- Users can request data deletion: **Yes** — turning analytics off stops collection; link to `orbitra.app/habit-tracker/delete-data` explaining how to request deletion of analytics data.
- Topics, entries and notes: **stored only on the device, never collected** — so they are not declared as collected.

> If you ever add cloud backup, accounts or ads, update this form **before** releasing that build.

## 6. Testing tracks
1. **Internal testing** — you + up to 100 people, instant; use for every build.
2. **Closed testing** ("beta") — the 12 × 14-day requirement runs here.
3. **Production** — apply after the closed test; choose countries: United States, Canada, United Kingdom, all EU/EEA countries, Switzerland, Norway, Iceland (+ Australia/New Zealand optional, English-speaking).

## 7. Before you press "Send for review"
- [ ] Policy status page shows no issues
- [ ] Target API level meets the current requirement
- [ ] Data safety matches `docs/09-analytics/events.json`
- [ ] Privacy policy URL loads and names Orbitra + contact email
- [ ] Title has no "Free", "Best", "#1", emoji or ALL CAPS
- [ ] Screenshots show the real app
