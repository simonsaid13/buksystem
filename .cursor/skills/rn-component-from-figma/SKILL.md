---
name: rn-component-from-figma
description: Builds React Native components for the Bukovel design system from a Figma link. Inspects Figma via MCP, confirms the plan with the user, then creates all files following the strict project structure. Use when a Figma link is provided, when the user asks to build or update a component, or when adding new states to an existing component.
---

# Build RN Component from Figma

## Workflow

**Step 1 — Inspect Figma via MCP**
Call `get_figma_data` with the fileKey and nodeId from the Figma URL.
Extract: component name, all variants/states, props, sub-components, layout details.

**Step 2 — Confirm plan with user BEFORE writing code**
Present:
- Detected component name and category (atom / molecule / organism)
- All variants and states found
- Any missing states (see checklist below)
- Whether two similar Figma components should be merged into one with a `variant` prop

Ask: "I see these states: [list]. Are there any missing? Should I proceed?"

**Step 3 — Build file structure**
```
src/components/{atoms|molecules|organisms}/ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.styles.ts
├── index.ts
└── README.md
```
For components with 2+ sub-components, add a `components/` subfolder.

**Step 4 — Implement**

Rules that always apply:
- Only use `tokens.*` for colors — never hardcoded hex values
- Only use `spacing.*` and `radius.*` — never hardcoded numbers
- Only use `<AppTypography>` for all text — never raw `<Text>`
- Only use `<AppIcon>` for all icons
- `allowFontScaling={false}` is handled inside `AppTypography` — no need to set it again
- Theme-agnostic: the component never knows which theme is active

**Step 5 — Detect icon source**
- Standard UI icon (arrow, search, close, etc.) → Iconoir. Name in PascalCase: `ArrowRight`, `Search`
- Bukovel-specific icon (gondola, ski lift, slope) → custom SVG in `src/assets/icons/custom/`

**Step 6 — Handle missing states**
Check for each of these. If missing from Figma, ask the user:
- `isDisabled` — disabled visual state
- `isLoading` — spinner / skeleton for async actions
- `isEmpty` / `isError` — for lists, inputs, data displays
- Focus / active state for inputs
- Pressed state for interactive elements

**Step 7 — Add multi-language text stress tests to registry**
After any component with text, add preview states:
- Default (short Ukrainian text)
- Long text 1.5–2× length (German/Polish simulation)
- Wrap test: text that forces 2+ lines

If the component breaks at 2 lines, flag it: "The [ComponentName] label wraps with longer text. Should I (1) truncate with ellipsis, or (2) allow wrap and adjust layout?"

**Step 8 — Generate README.md**
```md
# ComponentName
[1–2 sentence description from Figma]

## Variants
| Variant | Description |
|---------|-------------|
| primary | ... |

## States
| State | Prop | Default |
|-------|------|---------|
| Default | — | — |
| Disabled | isDisabled={true} | false |
| Loading | isLoading={true} | false |

## Figma
[Figma component URL]

## Usage
\`\`\`tsx
<ComponentName variant="primary" onPress={() => {}} />
\`\`\`
```

**Step 9 — Update registry.ts**
Always update `src/screens/DesignSystem/registry.ts` after creating or modifying a component.
```ts
{
  id: 'component-name',
  name: 'ComponentName',
  category: 'atoms',       // atoms | molecules | organisms
  figmaPage: 'Controls',   // Figma page name
  description: '...',
  states: [...],
  component: ComponentName,
}
```

**Step 10 — Summary**
Report: component name, category, states built, any Figma mismatches detected, and any TODOs left for the user.

---

## Templates

### ComponentName.tsx
```tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import useTheme from '@hooks/useTheme';
import AppTypography from '@components/atoms/AppTypography';
import { createStyles } from './ComponentName.styles';
import type { ComponentNameProps } from './ComponentName.types';

const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'primary',
  isDisabled = false,
  isLoading = false,
  onPress,
  children,
}) => {
  const { tokens } = useTheme();
  const styles = createStyles(tokens);

  return (
    <TouchableOpacity
      onPress={isDisabled || isLoading ? undefined : onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
    >
      {/* content */}
    </TouchableOpacity>
  );
};

export default ComponentName;
```

### ComponentName.styles.ts
```ts
import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';
import type { ColorTokens } from '@theme/tokens';

export const createStyles = (tokens: ColorTokens) =>
  StyleSheet.create({
    container: {
      backgroundColor: tokens.bgCard,
      borderRadius: radius.large,
      padding: spacing.large,
    },
  });
```

### ComponentName.types.ts
```ts
export type ComponentNameVariant = 'primary' | 'secondary';
export type ComponentNameSize = 'small' | 'medium' | 'large';

export type ComponentNameProps = {
  variant?: ComponentNameVariant;
  size?: ComponentNameSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
};
```

---

## Atomic categories

| Category | Examples | Rule |
|----------|----------|------|
| **atoms** | AppButton, AppInput, AppBadge, AppTag, AppToggle, AppCheckbox, AppSpinner | Single-purpose, no composition |
| **molecules** | AppFormField, AppListItem, AppCardHeader, AppSearchBar | 2+ atoms composed together |
| **organisms** | AppModal, AppBottomSheet, AppForm, AppFilterPanel | Complex, multiple molecules |
