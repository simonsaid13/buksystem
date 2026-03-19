/**
 * Typography scale — variant names map directly to Figma token names (camelCase).
 * Figma: https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=2-901
 *
 * Font: Bukovel (custom brand font)
 * All values extracted from Figma via MCP on 19.03.2026.
 */

export type FontWeight = '200' | '300' | '400' | '500' | '600' | '700';

export type TypographyVariant =
  | 'number1'
  | 'display1'
  | 'display2'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body1Highlight'
  | 'body1TinyHighlight'
  | 'body1'
  | 'body1Tiny'
  | 'body2Highlight'
  | 'body2TinyHighlight'
  | 'body2'
  | 'body2Tiny'
  | 'captionHighlight'
  | 'captionRegular'
  | 'captionLabel'
  | 'ctaLarge'
  | 'ctaRegular'
  | 'ctaSmall';

export interface TypographyStyle {
  fontFamily: string;
  fontWeight: FontWeight;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
}

const FONT_FAMILY = 'Bukovel';

/**
 * Converts Figma's em-based lineHeight to pixels by multiplying with fontSize.
 * Figma token → lineHeight in em × fontSize = lineHeight in px.
 */
export const typography: Record<TypographyVariant, TypographyStyle> = {
  // number/number-1: 36px regular, 1em line height, ~1.06% letter spacing
  number1: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 36,
    lineHeight: 36,
    letterSpacing: 0.38,
  },

  // display/display-1: 40px semibold, 1.2em = 48px, -2% letter spacing
  display1: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.8,
  },

  // display/display-2: 28px semibold, 1.143em = 32px, -2% letter spacing
  display2: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.56,
  },

  // title/title-1: 24px semibold, 1.333em = 32px, -2% letter spacing
  title1: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.48,
  },

  // title/title-2: 20px medium, 1.4em = 28px
  title2: {
    fontFamily: FONT_FAMILY,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 28,
  },

  // title/title-3: 16px semibold, 1.5em = 24px
  title3: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },

  // body/body-1h: 16px semibold, 1.5em = 24px
  body1Highlight: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },

  // body/body-1h-tiny: 16px semibold, 1.25em = 20px
  body1TinyHighlight: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  },

  // body/body-1: 16px regular, 1.5em = 24px
  body1: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },

  // body/body-1-tiny: 16px regular, 1.25em = 20px
  body1Tiny: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
  },

  // body/body-2h: 14px semibold, 1.429em = 20px
  body2Highlight: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },

  // body/body-2h-tiny: 14px semibold, 1.143em = 16px
  body2TinyHighlight: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
  },

  // body/body-2: 14px regular, 1.429em = 20px
  body2: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },

  // body/body-2-tiny: 14px regular, 1.143em = 16px
  body2Tiny: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  },

  // caption/caption-h: 12px semibold, 1.167em = 14px
  captionHighlight: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
  },

  // caption/caption: 12px regular, 1.167em = 14px
  captionRegular: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
  },

  // caption/caption-label: 10px semibold, 1.4em = 14px, uppercase
  captionLabel: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 14,
    textTransform: 'uppercase',
  },

  // cta/cta-large: 16px semibold, 1.25em = 20px
  ctaLarge: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  },

  // cta/cta-regular: 14px semibold, 1.143em = 16px
  ctaRegular: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
  },

  // cta/cta-small: 12px semibold, 1.167em = 14px
  ctaSmall: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
  },
};
