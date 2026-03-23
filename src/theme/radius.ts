/**
 * Border radius values.
 * Always use these named values — never hardcode numbers in components.
 */
export const radius = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 9999,
} as const;

export type Radius = typeof radius;
