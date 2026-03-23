import { primitives } from '../primitives';
import { bgGradientWinter, bgGradientAi } from '../gradients';
import type { ColorTokens } from '../tokens';

/**
 * Winter theme token values.
 * Figma: https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=2-1438
 */
export const winterTokens: ColorTokens = {
  // Background
  themeBackground: bgGradientWinter,
  bgAi: bgGradientAi,
  surface: primitives.white,
  bgOnSurface: primitives.neutral100,
  bgCard: primitives.white,

  // Interactive (AppButton Figma: default #28E7F4, pressed #21C1CC)
  intPrimary: primitives.brand500,
  intPrimaryPressed: primitives.brand600,
  intSecondary: primitives.neutral100,
  intSecondaryPressed: primitives.neutral200,
  intDisabled: primitives.neutral300,

  // Text
  textOnInt: primitives.white,
  textOnIntSubtle: primitives.brand600,
  textOnCard: primitives.neutral900,
  textOnCardSubtle: primitives.neutral600,
  textOnBgOnSurface: primitives.neutral900,
  textOnBgOnSurfaceSubtle: primitives.neutral600,
  textDisabled: primitives.neutral500,

  // Icon
  iconOnInt: primitives.white,
  iconOnIntSubtle: primitives.brand600,
  iconOnCard: primitives.neutral900,
  iconOnCardSubtle: primitives.neutral600,
  iconDisabled: primitives.neutral500,

  // Strokes & Dividers
  strokeOnSurface: primitives.neutral200,
  dividerOnSurface: primitives.neutral200,
};
