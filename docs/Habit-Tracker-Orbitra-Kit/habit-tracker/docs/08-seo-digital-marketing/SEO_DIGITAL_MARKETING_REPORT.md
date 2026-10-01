# SEO / Digital Marketer — Instruction Report

**Role goal:** get Habit Tracker found on Google Play and Google Search in the US, Canada, UK and EU — with zero ad budget at launch.

## 1. Positioning
**One-liner:** *Log anything you do. See when, how often, and how long ago.*
**Category hook:** habit tracker (big search demand) + day counter / days since (clear use case) + period totals (our difference).
**Proof points:** private (on-device), no ads, no account, works offline, exports your data.

## 2. App Store Optimization (Google Play)

### Title (27/30)
```
Habit Tracker & Day Counter
```
Alternatives to A/B test later with *Store listing experiments*: `Habit Tracker: Days Since Log` (29) · `Habit Tracker & Activity Log` (28)

### Short description (80/80)
```
Day counter, activity log & days since tracker. Count how often you do anything.
```

### Full description (1,599 chars — limit 4,000)
```
Habit Tracker is a simple habit tracker and day counter that shows when, how often, and how long ago you did anything.

When did you last visit your parents? How many office days did you have this month? How many times did you go to the gym this year — and on which dates? Habit Tracker answers in one tap.

Create your own topics — Office, Gym, Visited Mom, Date Night, Haircut, Gave Money — and add them to your calendar. Tick them off when they're done, and Habit Tracker counts everything for you.

LOG ANYTHING
• Unlimited custom topics with colours and icons
• Add to a single day or a date range, like a 3-day trip
• Plan ahead, then tick it off when it's done
• Add a note to any entry

SEE YOUR HISTORY
• Open any topic to see every date you did it
• "Last time" shows how many days ago you did something
• A clean monthly calendar with colour dots

COUNT IT INSTANTLY
• This month, last 3 months, this year, or any custom range
• Clear totals for every topic, with a month-by-month chart
• Compare all your topics on one screen

STAY ON TRACK, CALMLY
• Gentle reminders
• Ready-made templates to start in seconds
• No guilt, no broken-streak shaming

PRIVATE BY DESIGN
• No account. No ads.
• Your log stays on your phone and works offline
• Export to CSV or JSON anytime
• Optional, anonymous usage statistics — only if you say yes

Great for tracking office attendance for hybrid work, gym sessions, family visits, chores, appointments, reading, self-care, money you gave or lent, and anything else you want to remember.

Habit Tracker is made by Orbitra — simple apps for everyday life.
```
Rules: the phrase "habit tracker" already appears naturally through the app name — don't add more repetitions (keyword stuffing is penalised); avoid "free", "best", "#1".

### Keyword map

| Priority | Keyword cluster | Where |
|---|---|---|
| 1 | habit tracker, habit tracker app | Title, description line 1 |
| 1 | day counter, days since, days since last | Title, short description |
| 2 | activity log, life log, daily log | Short desc, body |
| 2 | office attendance tracker, hybrid work days | Body, website article |
| 3 | event counter, routine tracker, how many times | Body |
| 3 | when did I last | Body (question form), website |

### Screenshots (6 × 1080×1920, captions ≤ 5 words, Navy background, real UI)
1. **"Log anything in one tap"** — Today screen
2. **"See when you did it"** — Topic detail with date history
3. **"Count by month or year"** — Stats with period chips
4. **"Plan days ahead"** — Calendar with range selected
5. **"Last time: 23 days ago"** — Last-time chips
6. **"Private. No ads. Offline."** — Settings/privacy with logo

Build them from `design/screens/index.html` once the real app matches; then replace with real-device captures.

### Ratings & reviews
- Use the **Play In-App Review API** after the user has logged 7 entries on 3 different days — never right after an error, never more than once per 30 days.
- Reply to every review within 48 h (template: thank → answer → what's coming).

## 3. Website SEO (orbitra.app/habit-tracker)

| Element | Value |
|---|---|
| `<title>` | Habit Tracker & Day Counter — Log When & How Often \| Orbitra |
| Meta description | Free Android habit tracker and day counter. Log anything on a calendar and see when, how often and how long ago — private, offline, no ads. |
| H1 | Log anything. See when, how often, and how long ago. |
| Structured data | `SoftwareApplication` (operatingSystem Android, applicationCategory ProductivityApplication, offers price 0) |
| CTA | Official "Get it on Google Play" badge with UTM link |

*(The word "free" is fine on the website — the restriction applies to the Play title/icon.)*

**Content plan — 1 article per week (each answers a real search question):**
1. How to track office days for hybrid work (with a free template)
2. "When did I last…?" — 25 things worth tracking
3. Habit tracker vs day counter: which do you need?
4. How to count how many times you did something this year
5. 10 habit tracker ideas that aren't about streaks
6. New Year's resolutions you can actually measure (publish mid-December)

Each article links to the app with UTM: `https://play.google.com/store/apps/details?id=com.orbitra.habittracker&referrer=utm_source%3Dwebsite%26utm_medium%3Dblog%26utm_campaign%3D<slug>`

## 4. Social media

| Platform | Handle | Use |
|---|---|---|
| Instagram | @orbitra.apps / @habittracker.app | Share-card style posts, Reels of the tick animation |
| TikTok | @orbitra.apps | 15-s "I tracked X for a year" stories |
| X | @orbitraapps | Build-in-public updates, release notes |
| Reddit | personal account | Helpful answers; launch posts where rules allow |
| Product Hunt | Orbitra | Launch day |

Profile pictures and banners: `brand-kit/social-media/`. Bio: *"Log anything. See when, how often & how long ago. Private habit tracker for Android — by Orbitra."*

**Content pillars:** (1) "When did you last…?" prompts (2) Real counts / year-in-numbers (3) Build-in-public (4) Privacy (no ads, on-device).
**Cadence:** 3 posts/week, 1 short video/week.

## 5. Launch plan

| When | Action |
|---|---|
| Now → Nov | Build in public on X/Reddit; collect a waitlist on the landing page; recruit closed testers |
| Closed test | Ask testers for honest reviews on launch day |
| Launch week | Product Hunt (Tue–Thu, 12:01 a.m. PT) · r/androidapps · r/productivity (check rules) · Show HN · AlternativeTo listing (as alternative to Loop, Daylio, Day Counter) · Indie Hackers |
| Mid-December | "Measure your resolutions" article + social push |
| Jan 1–15 | Peak season: daily posts, reply to every review, release v1.1 (widget, streaks, heatmap) |

## 6. KPIs
- Store listing conversion (visitors → installs) ≥ 30%
- Organic search installs share ≥ 60% by month 3
- Keyword rank: top 50 for "day counter", top 100 for "habit tracker" by month 3
- Website: 1,000 organic visits/month by month 4
