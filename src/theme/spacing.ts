/**
 * Spacing scale. Base unit: 4px. All values are multiples of 4.
 * Always use these named values — never hardcode numbers in components.
 */
export const spacing = {
  tiny: 4,
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 20,
  xxLarge: 24,
  xxxLarge: 32,
  xxxxLarge: 40,

  // Semantic aliases
  componentPadding: 16,
  screenPadding: 20,
  cardPadding: 16,
  gap: 8,
  gapLarge: 16,
} as const;

export type Spacing = typeof spacing;
