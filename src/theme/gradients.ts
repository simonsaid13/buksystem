/**
 * Gradient definitions — raw values sourced from Figma.
 * These cannot be stored as Figma variables (gradient limitation), so they live here.
 *
 * Format matches expo-linear-gradient props directly:
 *   <LinearGradient colors={g.colors} locations={g.locations} start={g.start} end={g.end} />
 *
 * Figma source:
 *   bg-gradients/winter — node 58-879
 *   bg-gradients/ai    — node 58-878
 *   https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles
 */

export type GradientConfig = {
  colors: string[];
  locations: number[];
  start: { x: number; y: number };
  end: { x: number; y: number };
};

/** Main screen background for the winter theme. Vertical top-to-bottom. */
export const bgGradientWinter: GradientConfig = {
  colors: ['#C3E2FC', '#E8F0F8', '#F0F7FF'],
  locations: [0, 0.16, 0.4],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
};

/** AI feature screen background. Vertical top-to-bottom. */
export const bgGradientAi: GradientConfig = {
  colors: ['#C3CBFC', '#EEE8F8', '#F0F9FF'],
  locations: [0, 0.16, 0.4],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
};
