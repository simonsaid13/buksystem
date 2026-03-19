import { primitives } from '../primitives';
import type { ColorTokens } from '../tokens';

/**
 * Winter theme token values.
 * Figma: https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=2-1438
 *
 * NOTE: Values marked with TODO need to be verified against the Figma source.
 * The semantic table in Figma uses Variables — use the Figma MCP to confirm each value.
 */
export const winterTokens: ColorTokens = {
  // Background
  bgWinter: primitives.white,
  bgSummer: primitives.white,
  bgAi: primitives.white,
  bgSurface: primitives.white,
  bgOnSurface: primitives.neutral100,
  bgCard: primitives.white,

  // Interactive (AppButton Figma: default #28E7F4, pressed #21C1CC)
  intPrimary: primitives.brand500,
  intPrimaryPressed: primitives.brand600,
  intSecondary: primitives.neutral100,    // #E7EFFC — light fill
  intSecondaryPressed: primitives.neutral200,
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
