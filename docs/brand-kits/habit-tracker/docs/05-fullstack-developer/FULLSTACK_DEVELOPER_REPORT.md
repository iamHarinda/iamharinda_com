# Full-stack Developer — Instruction Report

**Role goal:** a fast, offline, bug-free app whose counts are always correct. Read `CLAUDE.md` first — it contains the coding rules.

## 1. Architecture

```
┌──────────── UI (Expo Router screens) ─────────────┐
│ Today · Calendar · Topics · Topic detail · Stats  │
└───────────────┬───────────────────────────────────┘
                │ hooks (useTopics, useEntries, useStats)
┌───────────────▼───────────────┐   ┌──────────────────────┐
│ Feature repos (repo.ts)       │   │ lib/analytics/track  │──► Firebase GA4
│ topics · entries · stats      │   │ (consent-gated)      │    (anonymous events)
└───────────────┬───────────────┘   └──────────────────────┘
                │ Drizzle ORM
┌───────────────▼───────────────┐
│ expo-sqlite (on device only)  │
└───────────────────────────────┘
```

"Full-stack" here = app + local database + analytics + build pipeline. **There is no backend server in v1** — that is a feature (privacy, zero hosting cost). The only web pieces are the static website and privacy policy (see DevOps).

## 2. Project setup (day 1)

```bash
npx create-expo-app@latest habit-tracker -t default
cd habit-tracker
npx expo install expo-sqlite expo-localization expo-notifications expo-splash-screen \
  expo-font expo-build-properties expo-file-system expo-sharing expo-document-picker expo-haptics
npm i drizzle-orm zustand date-fns react-native-calendars victory-native @shopify/react-native-skia uuid
npm i -D drizzle-kit jest jest-expo @testing-library/react-native typescript eslint prettier
npx expo install @react-native-firebase/app @react-native-firebase/analytics @react-native-firebase/crashlytics
```
Then:
1. Copy `brand-kit/tokens/app.json` → `app.json`, `brand-kit/tokens/firebase.json` → `firebase.json`.
2. Copy icons from `brand-kit/app-icons/android/*.png` and fonts from `brand-kit/fonts/` into `assets/`.
3. Create Firebase project **"Habit Tracker"** → add Android app `com.orbitra.habittracker` → download `google-services.json` to repo root (**git-ignored**; stored as an EAS secret file).
4. `npx expo prebuild` is handled by EAS; locally use `npx expo run:android`.

## 3. Database schema (Drizzle)

```ts
// src/db/schema.ts
import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const topics = sqliteTable('topics', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  color: text('color').notNull(),
  icon: text('icon').notNull(),
  archived: integer('archived', { mode: 'boolean' }).notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const entries = sqliteTable('entries', {
  id: text('id').primaryKey(),
  topicId: text('topic_id').notNull().references(() => topics.id, { onDelete: 'cascade' }),
  date: text('date').notNull(),                      // 'YYYY-MM-DD' local
  status: text('status', { enum: ['planned', 'done'] }).notNull(),
  note: text('note'),
  groupId: text('group_id'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
}, (t) => ({
  byTopicDate: index('idx_entries_topic_date').on(t.topicId, t.date),
  byDate: index('idx_entries_date').on(t.date),
}));
```
Enable foreign keys on open: `PRAGMA foreign_keys = ON;` and WAL: `PRAGMA journal_mode = WAL;`.

## 4. Date helpers (write these + tests FIRST)

```ts
// src/lib/dates/index.ts
import { format, addDays, differenceInCalendarDays, parseISO, startOfMonth, endOfMonth,
         startOfYear, endOfYear, subMonths } from 'date-fns';

export type Period = { kind: 'month' | '3m' | 'year' } | { kind: 'custom'; from: string; to: string };

export const toKey = (d: Date) => format(d, 'yyyy-MM-dd');           // local, never UTC
export const fromKey = (k: string) => parseISO(k);                    // local midnight
export const todayLocal = () => toKey(new Date());

export function rangeDays(from: string, to: string): string[] {
  const start = fromKey(from), n = differenceInCalendarDays(fromKey(to), start);
  if (n < 0 || n > 365) throw new Error('Range must be 1–366 days');
  return Array.from({ length: n + 1 }, (_, i) => toKey(addDays(start, i)));
}

export function periodRange(p: Period, now = new Date()): { from: string; to: string } {
  switch (p.kind) {
    case 'month': return { from: toKey(startOfMonth(now)), to: toKey(endOfMonth(now)) };
    case '3m':    return { from: toKey(startOfMonth(subMonths(now, 2))), to: toKey(endOfMonth(now)) };
    case 'year':  return { from: toKey(startOfYear(now)), to: toKey(endOfYear(now)) };
    case 'custom':return { from: p.from, to: p.to };
  }
}

export const daysSince = (k: string, now = new Date()) =>
  differenceInCalendarDays(now, fromKey(k));
```
> "Last 3 months" = the current month plus the two before it (e.g. Aug 1 – Oct 31). Show the exact range under the chip so users are never surprised.

**Required tests:** month boundaries, leap day 2028-02-29, DST change days (US Mar/Nov, EU Mar/Oct), range of 1 day, range of 366, reversed range throws.

## 5. Core queries

```ts
// src/features/stats/repo.ts
export async function countsByTopic(db: DB, from: string, to: string) {
  return db.all<{ id: string; name: string; color: string; icon: string; times: number; lastDate: string | null }>(sql`
    SELECT t.id, t.name, t.color, t.icon,
           COUNT(e.id) AS times,
           (SELECT MAX(date) FROM entries WHERE topic_id = t.id AND status = 'done') AS lastDate
    FROM topics t
    LEFT JOIN entries e ON e.topic_id = t.id AND e.status = 'done' AND e.date BETWEEN ${from} AND ${to}
    WHERE t.archived = 0
    GROUP BY t.id
    ORDER BY times DESC, t.sort_order`);
}

export async function monthlyCounts(db: DB, topicId: string, from: string, to: string) {
  return db.all<{ month: string; times: number }>(sql`
    SELECT substr(date, 1, 7) AS month, COUNT(*) AS times
    FROM entries
    WHERE topic_id = ${topicId} AND status = 'done' AND date BETWEEN ${from} AND ${to}
    GROUP BY month ORDER BY month`);
}
```

Range add (C3) in one transaction, skipping days already logged:
```ts
export async function addRange(db: DB, topicId: string, from: string, to: string, status: Status, note?: string) {
  const days = rangeDays(from, to), groupId = uuid(), now = new Date().toISOString();
  return db.transaction(async (tx) => {
    const existing = new Set((await tx.select({ d: entries.date }).from(entries)
      .where(and(eq(entries.topicId, topicId), between(entries.date, from, to)))).map(r => r.d));
    const rows = days.filter(d => !existing.has(d))
      .map(d => ({ id: uuid(), topicId, date: d, status, note, groupId, createdAt: now, updatedAt: now }));
    if (rows.length) await tx.insert(entries).values(rows);
    return { added: rows.length, skipped: days.length - rows.length };
  });
}
```

## 6. Analytics wiring (consent-gated)

```ts
// src/lib/analytics/track.ts
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import type { EventName, EventParams } from './events';   // generated from docs/09-analytics/events.json

let enabled = false;

export async function setAnalyticsConsent(granted: boolean) {
  enabled = granted;
  await analytics().setConsent({
    analytics_storage: granted, ad_storage: false, ad_user_data: false, ad_personalization: false,
  });
  await analytics().setAnalyticsCollectionEnabled(granted);
  await crashlytics().setCrashlyticsCollectionEnabled(granted);
}

export function track<E extends EventName>(name: E, params?: EventParams[E]) {
  if (!enabled) return;
  analytics().logEvent(name, params as Record<string, unknown>);
}

export function screen(name: string) {
  if (!enabled) return;
  analytics().logScreenView({ screen_name: name, screen_class: name });
}
```
- Call `setAnalyticsConsent(savedChoice)` on app start (default **false**).
- Never pass topic names, notes or dates. Allowed params are listed in `events.json`.

## 7. Backup
- **Export:** CSV (`date,topic,status,note`) + JSON (`{ version, exportedAt, topics, entries, reminders }`) via `expo-file-system` + `expo-sharing`.
- **Import:** JSON only; validate `version`; upsert by `id` (idempotent); show summary.

## 8. Performance budget
- Use `FlashList` for history lists; paginate history by year.
- Stats queries must stay < 300 ms with 10,000 entries — add a seed script `npm run seed:big` and measure.
- Lazy-load charts (Skia) only on Topic detail/Stats.

## 9. Definition of done
See `CLAUDE.md`. In short: offline ✓ · light/dark ✓ · tests ✓ · no PII in analytics ✓ · TalkBack ✓.
