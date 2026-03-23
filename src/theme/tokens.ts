import type { GradientConfig } from './gradients';

/**
 * Semantic color tokens — the ONLY colors components may reference.
 * Access via useTheme(): const { tokens } = useTheme();
 *
 * Token names match Figma token names (kebab-case → camelCase).
 * Token values are theme-specific and defined in src/theme/themes/.
 * Figma: https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=2-1438
 */
export interface ColorTokens {
  // Background
  /**
   * Main screen background for the active theme.
   * This is a gradient — use <LinearGradient {...tokens.themeBackground} />
   */
  themeBackground: GradientConfig;
  /**
   * AI feature backgrounds.
   * This is a gradient — use <LinearGradient {...tokens.bgAi} />
   */
  bgAi: GradientConfig;
  /** Modal windows and bottom sheets */
  surface: string;
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
  /** Subtle/secondary text on interactive elements */
  textOnIntSubtle: string;
  /** Primary text on cards */
  textOnCard: string;
  /** Subtle/secondary text on cards */
  textOnCardSubtle: string;
  /** Primary text on surface backgrounds */
  textOnBgOnSurface: string;
  /** Subtle/secondary text on surface backgrounds */
  textOnBgOnSurfaceSubtle: string;
  /** Disabled text */
  textDisabled: string;

  // Icon
  /** Icon on interactive elements */
  iconOnInt: string;
  /** Subtle/secondary icon on interactive elements */
  iconOnIntSubtle: string;
  /** Icon on cards */
  iconOnCard: string;
  /** Subtle/secondary icon on cards */
  iconOnCardSubtle: string;
  /** Disabled icon */
  iconDisabled: string;

  // Strokes & Dividers
  /** Stroke on surface backgrounds */
  strokeOnSurface: string;
  /** Divider on surface backgrounds */
  dividerOnSurface: string;
}
