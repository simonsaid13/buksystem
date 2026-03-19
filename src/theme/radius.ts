/**
 * Border radius values.
 * Always use these named values — never hardcode numbers in components.
 */
export const radius = {
  small: 4,
  medium: 8,
  large: 12,
  extraLarge: 16,
  xxLarge: 24,
  full: 9999,
} as const;

export type Radius = typeof radius;
