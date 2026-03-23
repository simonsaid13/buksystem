---
name: update-styles
description: Syncs the local design token files with the Figma Styles file. Fetches all color primitives, semantic tokens, typography, and spacing from Figma, compares them to what exists in src/theme/, writes a plain-English summary of every difference, then waits for user confirmation before changing any files. Use when the user says "update styles", "sync tokens", "pull from Figma", or "styles are out of date".
---

# Update Styles from Figma

## What this skill does

Pulls the latest design variables from the Figma Styles file, compares them to the local theme files, shows you a summary, and only makes changes after you say go.

---

## Step 1 — Fetch from Figma

Call `get_figma_data` for all four nodes in parallel (same fileKey for all):

| What | fileKey | nodeId | Full URL |
|------|---------|--------|----------|
| Primitives (raw colors) | `UVD55dzNAbBp6nYax44QdD` | `4-2011` | https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=4-2011 |
| Semantic tokens | `UVD55dzNAbBp6nYax44QdD` | `2-1438` | https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=2-1438 |
| Typography & Spacing | `UVD55dzNAbBp6nYax44QdD` | `2-901` | https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=2-901 |
| Corner Radius | `UVD55dzNAbBp6nYax44QdD` | `57-87` | https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=57-87 |

Extract from the response:
- All color variables with their hex values and names
- All text styles with font size, weight, line height, letter spacing
- All spacing values
- All corner radius values and their names

---

## Step 2 — Read local files

Read these files in parallel:

```
src/theme/primitives.ts
src/theme/tokens.ts
src/theme/themes/winter.ts
src/theme/themes/summer.ts
src/theme/typography.ts
src/theme/spacing.ts
src/theme/radius.ts
```

---

## Step 3 — Compare and build a summary

Compare Figma data to local files across four areas:

### A — Primitives (primitives.ts)
- Colors in Figma but missing locally → "New color to add"
- Colors in Figma with a different hex value → "Value changed"
- Colors that exist locally but are gone from Figma → "Possibly removed — confirm before deleting"

### B — Semantic tokens (tokens.ts + winter.ts + summer.ts)
- Token names in Figma but not in the local interface → "New token to add"
- Tokens that exist locally but have a different value in Figma → "Value changed"
- Tokens missing from Figma entirely → "Possibly removed — flag, do not auto-delete"
- Always check both winter and summer theme values

### C — Typography (typography.ts)
- Text styles in Figma that have no matching variant locally → "New variant"
- Existing variants with changed font size, weight, or line height → "Style changed"
- Local variants not found in Figma → "Possibly removed — flag only"

### D — Spacing (spacing.ts)
- Any spacing values in Figma that differ from local → "Value changed"
- New named spacing steps not present locally → "New step to add"

### E — Corner Radius (radius.ts)
- Radius values in Figma but missing locally → "New radius to add"
- Existing radius names with a different value → "Value changed"
- Local radius names not found in Figma → "Possibly removed — flag only"

---

## Step 4 — Present summary (STOP HERE)

Write the summary in plain language using this format:

```
## Style update summary

### Primitives
- brand500: #28E7F4 → #29E8F5  (value changed)
- orange50: not in local file  (new — needs adding)

### Semantic tokens
- bgAiSubtle: in Figma, missing locally  (new token)
- intError: local value differs from Figma  (value changed)

### Typography
- labelSmall: not in local file  (new variant)
- body1: line-height changed from 22 to 24  (style changed)

### Spacing
- No changes detected.

### Corner Radius
- radiusLarge: 12 → 16  (value changed)
- radiusXL: not in local file  (new — needs adding)

### Items to confirm before removing
- purple300 exists locally but was not found in Figma.
  → I will NOT remove it automatically. Tell me if it should go.
```

**After the summary, say:**
"Let me know if you want me to apply all of these, skip any of them, or if something looks wrong."

**Do not write any files until the user replies.**

---

## Step 5 — Apply after confirmation

Once the user confirms (or gives adjusted instructions):

- Update only the files where changes were approved
- Never remove anything marked "possibly removed" unless the user explicitly says to remove it
- After writing, run a quick self-check:
  - No hardcoded hex values in component files
  - Both winter and summer themes stay in sync
  - `ColorTokens` interface in `tokens.ts` matches the theme files

---

## Rules that always apply

- Never delete a token from `tokens.ts` without explicit user approval
- Never invent hex values — only use what came from Figma
- If a Figma value is off the 4px spacing grid, flag it and ask before adding it
- If Figma uses a typography name that doesn't match the existing camelCase mapping, flag it and propose the closest match
