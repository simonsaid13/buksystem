# AppTypography

The single text rendering component for the entire app. Maps directly to Figma typography token names. Never use raw `<Text>` in any component — always use `<AppTypography>`.

## Variants

| Variant | Size | Weight | Line Height | Notes |
|---------|------|--------|-------------|-------|
| `number1` | 36px | Regular | 36px | Large numeric display |
| `display1` | 40px | SemiBold | 48px | Hero headings |
| `display2` | 28px | SemiBold | 32px | Section headings |
| `title1` | 24px | SemiBold | 32px | Page titles |
| `title2` | 20px | Medium | 28px | Sub-section titles |
| `title3` | 16px | SemiBold | 24px | Card titles |
| `body1Highlight` | 16px | SemiBold | 24px | Emphasized body |
| `body1TinyHighlight` | 16px | SemiBold | 20px | Compact emphasized body |
| `body1` | 16px | Regular | 24px | Standard body copy |
| `body1Tiny` | 16px | Regular | 20px | Compact body copy |
| `body2Highlight` | 14px | SemiBold | 20px | Secondary emphasized |
| `body2TinyHighlight` | 14px | SemiBold | 16px | Compact secondary emphasized |
| `body2` | 14px | Regular | 20px | Secondary body |
| `body2Tiny` | 14px | Regular | 16px | Compact secondary |
| `captionHighlight` | 12px | SemiBold | 14px | Emphasized captions |
| `captionRegular` | 12px | Regular | 14px | Standard captions |
| `captionLabel` | 10px | SemiBold | 14px | Uppercase labels |
| `ctaLarge` | 16px | SemiBold | 20px | Large button text |
| `ctaRegular` | 14px | SemiBold | 16px | Standard button text |
| `ctaSmall` | 12px | SemiBold | 14px | Small button text |

## Figma
https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=2-901

## Usage

```tsx
<AppTypography variant="title1">Bukovel</AppTypography>
<AppTypography variant="body1" color={tokens.textOnCardSubtle}>
  Ukraine's largest ski resort
</AppTypography>
<AppTypography variant="ctaLarge" align="center">Book Now</AppTypography>
```
