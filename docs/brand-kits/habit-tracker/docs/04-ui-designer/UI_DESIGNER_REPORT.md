# UI Designer — Instruction Report

**Role goal:** a calm, warm, premium-feeling interface that Western users trust on first sight, built only from the brand tokens.

## 1. Sources of truth
- Tokens: `brand-kit/tokens/design-tokens.json` (and `theme.ts` for code)
- Brand rules: `brand-kit/BRAND_GUIDELINES.html`
- Screen designs: `design/screens/index.html` (open in a browser; light + dark)

## 2. Visual direction — "Warm notebook"
- **Cream** background (not stark white) feels like paper; **Navy** text feels confident; **Coral** only where the user acts.
- Generous spacing (16/24 px), large rounded cards (radius 16–24), soft shadows.
- Big **Inter Display ExtraBold** numbers make answers instantly scannable.
- Topic colours are the only "loud" colour — they identify, they don't decorate.
- Follows Material 3 structure (bottom navigation, FAB, bottom sheets, chips) so it feels native on Android, but with our own palette instead of dynamic colour.

## 3. Layout grid
- Base unit 4 px; spacing tokens xs 4 · sm 8 · md 12 · lg 16 · xl 24 · xxl 32
- Screen side padding 16 px (20 px on ≥ 412 dp wide)
- Max content width 600 dp (tablets centre content)
- Bottom nav height 80 dp; FAB 56 dp, 16 dp above nav, right 16 dp

## 4. Components

| Component | Spec |
|---|---|
| **Button / primary** | Coral bg, Ink text, 48 h, radius pill, Label 14/600 |
| **Button / secondary** | Surface bg, Navy text, 1 px border |
| **FAB** | 56×56, Coral, Ink "+" 24 px, shadow `fab` |
| **Chip (period filter)** | 36 h, radius pill; selected = Navy bg + Cream text; unselected = surfaceMuted |
| **Topic row** | 64 h; 40 px colour circle with icon; name (Body/600); right: big count + "last time" caption |
| **Entry row** | 56 h; topic dot; name; status check (32 px circle; planned = outline, done = teal fill + ✓) |
| **Day cell** | 44×44; date number; up to 3 dots (6 px); today = Coral ring; selected = Navy fill |
| **Stat card** | Surface, radius 20, padding 20; label caption uppercase Coral; value Display 40 |
| **Bottom sheet** | Radius 24 top; drag handle 36×4; max height 90% |
| **Snackbar** | Navy bg, Cream text, Coral action text ("Undo") |
| **Bar chart** | Bars in topic colour, radius 6 top, 24 px gaps; axis labels Caption Slate |

## 5. Screen specs (summary)

| Screen | Hero element | Notes |
|---|---|---|
| Today | Greeting + date, "Planned today" list, "Done today" list | "Last time" horizontal chips at bottom: "Haircut · 41d" |
| Calendar | Month grid (full width) | Month title Display 28; tap = day sheet; long-press-drag = range |
| Add entry sheet | Topic grid (4 columns of colour circles) | Segmented: Single day / Range; date pickers; Planned/Done; note field |
| Topics | List of topic rows | Count = selected period (default this month) |
| Topic detail | Stat card: count for period + "Last time" | Period chips, monthly bars, date history list grouped by month |
| Stats | Ranked list with horizontal bars | Period chips at top; total entries summary card |
| Settings | Grouped list | Privacy section explains analytics in plain words |
| Onboarding | Illustration of the Orbit Check | 3 steps, progress dots, primary button bottom |

## 6. Iconography
- Material Symbols Rounded, weight 500, 24 px. Topic icon set: 40 curated icons (briefcase, dumbbell, house, heart, phone, book, car, scissors, stethoscope, coffee, plane, gift, dollar, paw, leaf, music, game, cart, baby, pill…).

## 7. Motion
- Standard 250 ms `cubic-bezier(0.2,0,0,1)`; sheets slide up; chips cross-fade.
- **Signature moment:** ticking an item fills one orbit segment then draws the check (mirrors the logo).
- Respect "Remove animations" system setting.

## 8. Dark mode
- Background Ink `#0B1220`, surfaces Navy `#14213D`, text Cream.
- Topic colours unchanged; Coral lightens to `#FF7A5C`.
- Shadows replaced by 1 px `border` token.

## 9. Hand-off checklist
- [ ] Every screen in light + dark
- [ ] Empty, loading, error and "lots of data" states drawn
- [ ] 360 dp and 412 dp widths checked
- [ ] Font scale 200% checked on Topic detail and Stats
- [ ] Icons exported / names listed for developer
- [ ] Store screenshots composed from final UI (see `docs/08-seo-digital-marketing`)
