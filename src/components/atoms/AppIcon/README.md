# AppIcon

Unified icon component for the entire app. Wraps Iconoir React Native icons and custom Bukovel SVG icons. Never import icon libraries directly in feature components.

## Icon sources

| Source | When to use | Naming |
|--------|-------------|--------|
| Iconoir | All standard UI icons | PascalCase: `ArrowRight`, `Search`, `XmarkCircle` |
| Custom SVG | Gondola, ski lifts, slopes, snowpark | PascalCase: `Gondola`, `SkiLift`, `SkiSlope` |

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `name` | `string` | required | PascalCase icon name |
| `size` | `16 \| 20 \| 24 \| 32` | `24` | Standard sizes only |
| `color` | `string` | `tokens.iconOnCard` | Use token values |
| `strokeWidth` | `number` | `1.5` | Iconoir icons |
| `isDecorative` | `boolean` | `false` | Hides from screen readers |

## Sizes

| Size | Use case |
|------|----------|
| 16 | Caption, tight UI elements |
| 20 | Default inline icons |
| 24 | Standard UI icons |
| 32 | Feature icons, empty states |

## Figma
Iconoir reference: https://iconoir.com/docs/packages/iconoir-react-native

## Usage

```tsx
const { tokens } = useTheme();

<AppIcon name="Search" size={24} color={tokens.iconOnCard} />
<AppIcon name="ArrowRight" size={20} color={tokens.iconOnInt} />
<AppIcon name="XmarkCircle" size={24} color={tokens.iconOnCardSubtle} isDecorative />
```
