# AppButton

Primary and secondary pill-shaped actions from Figma (`AppButtonBig`, `AppButtonSmall`). One component: pick `size="large"` or `size="small"`, and a `layout` for plain text, icon + text, or the price-style row with a dot.

## Variants (`variant`)

| Value | Description |
|--------|-------------|
| `primary` | Bright teal fill, dark label (default). |
| `secondary` | Soft fill, dark label. |

## Sizes (`size`)

| Value | Typography | Matches Figma |
|--------|------------|----------------|
| `large` | `ctaLarge` | AppButtonBig |
| `small` | `ctaRegular` | AppButtonSmall |

## Layouts (`layout`)

| Value | Description |
|--------|-------------|
| `text` | Label from `children`. |
| `iconLeading` | Iconoir icon (`leadingIconName`) + `children`. |
| `priceCta` | `priceLabel`, dot, `priceAmount` (no `children`). |

## States

| State | Prop | Default |
|-------|------|---------|
| Default | — | — |
| Pressed (finger down) | — | `Pressable` uses a darker fill. |
| Pressed (frozen preview) | `isPressed={true}` | `false` — for design system / screenshots only. |
| Disabled | `isDisabled={true}` | `false` |
| Loading | `isLoading={true}` | `false` |

The design system lists all **36** Figma cells: Large/Small × primary/secondary × default/pressed/disabled × text/icon/priceCta.

## Figma

- [AppButtonBig](https://www.figma.com/design/zkYQ9A5rFi1V9fBR5BvBgg/Bukovel--Components?node-id=1013-90)
- [AppButtonSmall](https://www.figma.com/design/zkYQ9A5rFi1V9fBR5BvBgg/Bukovel--Components?node-id=1013-213)

## Usage

```tsx
<AppButton onPress={() => {}}>Забронювати</AppButton>

<AppButton size="small" variant="secondary" layout="iconLeading" leadingIconName="Plus">
  Додати
</AppButton>

<AppButton
  layout="priceCta"
  priceLabel="Оплатити частинами"
  priceAmount="1 600 ₴"
  onPress={() => {}}
/>
```
