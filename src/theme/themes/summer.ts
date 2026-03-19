import { primitives } from '../primitives';
import type { ColorTokens } from '../tokens';

/**
 * Summer theme token values.
 * Figma: https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=2-1438
 *
 * NOTE: Summer theme values need to be filled in from Figma once confirmed.
 * Currently using winter values as placeholders.
 */
export const summerTokens: ColorTokens = {
  // Background
  bgWinter: primitives.white,
  bgSummer: primitives.white,
  bgAi: primitives.white,
  bgSurface: primitives.white,
  bgOnSurface: primitives.green100,
  bgCard: primitives.white,

  // Interactive (aligned with AppButton / brand steps)
  intPrimary: primitives.brand500,
  intPrimaryPressed: primitives.brand600,
  intSecondary: primitives.green100,
  intSecondaryPressed: primitives.green200,
  intDisabled: primitives.neutral300,

  // Text
  textOnInt: primitives.white,
  textOnIntSecondary: primitives.brand600,
  textOnCard: primitives.neutral900,
  textOnCardSecondary: primitives.neutral600,
  textOnBgOnSurface: primitives.neutral900,
  textOnBgOnSurfaceSecondary: primitives.neutral600,
  textDisabled: primitives.neutral500,

  // Icon
  iconOnInt: primitives.white,
  iconOnIntSecondary: primitives.brand600,
  iconOnCard: primitives.neutral900,
  iconOnCardSecondary: primitives.neutral600,
  iconDisabled: primitives.neutral500,

  // Strokes & Dividers
  strokeOnSurface: primitives.neutral200,
  dividerOnSurface: primitives.neutral200,
};
