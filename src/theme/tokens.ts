/**
 * Semantic color tokens — the ONLY colors components may reference.
 * Access via useTheme(): const { tokens } = useTheme();
 *
 * Token values are theme-specific and defined in src/theme/themes/.
 * Figma: https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=2-1438
 */
export interface ColorTokens {
  // Background
  /** Main screen background — winter theme */
  bgWinter: string;
  /** Main screen background — summer theme */
  bgSummer: string;
  /** AI feature backgrounds */
  bgAi: string;
  /** Modal windows and bottom sheets */
  bgSurface: string;
  /** Cards and elements placed on a surface */
  bgOnSurface: string;
  /** Card background */
  bgCard: string;

  // Interactive (buttons, toggles, interactive elements)
  /** Primary interactive — default fill (e.g. primary button) */
  intPrimary: string;
  /** Primary pressed / darker step */
  intPrimaryPressed: string;
  /** Secondary interactive — light fill */
  intSecondary: string;
  /** Secondary pressed state */
  intSecondaryPressed: string;
  /** All disabled interactive elements */
  intDisabled: string;

  // Text
  /** Text on interactive elements (e.g. white on teal button) */
  textOnInt: string;
  /** Secondary text on interactive elements */
  textOnIntSecondary: string;
  /** Primary text on cards */
  textOnCard: string;
  /** Secondary text on cards */
  textOnCardSecondary: string;
  /** Primary text on surface backgrounds */
  textOnBgOnSurface: string;
  /** Secondary text on surface backgrounds */
  textOnBgOnSurfaceSecondary: string;
  /** Disabled text */
  textDisabled: string;

  // Icon
  /** Icon on interactive elements */
  iconOnInt: string;
  /** Secondary icon on interactive elements */
  iconOnIntSecondary: string;
  /** Icon on cards */
  iconOnCard: string;
  /** Secondary icon on cards */
  iconOnCardSecondary: string;
  /** Disabled icon */
  iconDisabled: string;

  // Strokes & Dividers
  /** Stroke on surface backgrounds */
  strokeOnSurface: string;
  /** Divider on surface backgrounds */
  dividerOnSurface: string;
}
