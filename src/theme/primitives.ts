/**
 * Primitive color values — raw hex values, numeric scale.
 * These are extracted directly from the Figma Primitives page.
 * DO NOT use these directly in components. Use semantic tokens via useTheme().
 * Figma: https://www.figma.com/design/UVD55dzNAbBp6nYax44QdD/Bukovel--Styles?node-id=4-2011
 */
export const primitives = {
  // Brand (Teal) — Bukovel primary brand color
  brand100: '#E5FDFF',
  brand200: '#B2FAFF',
  brand300: '#80F7FF',
  brand400: '#2AF1FF',
  brand500: '#28E7F4',
  brand600: '#21C1CC',
  brand700: '#008F99',
  brand800: '#116166',
  brand900: '#083033',

  // Neutral (Blue-Gray)
  neutral100: '#E7EFFC',
  neutral200: '#DAE5F2',
  neutral300: '#D8DFE6',
  neutral400: '#BEC5CE',
  neutral500: '#9CA3AE',
  neutral600: '#6A7486',
  neutral700: '#4E5D7D',
  neutral800: '#313F64',
  neutral900: '#071835',

  // Blue
  blue100: '#E6EEFF',
  blue200: '#C9E9FF',
  blue300: '#92D1FD',
  blue400: '#6086D6',
  blue500: '#396FE3',
  blue600: '#3364CC',
  blue700: '#264B99',
  blue800: '#1A3266',
  blue900: '#0D1933',

  // Green
  green100: '#EFF8EC',
  green200: '#C9F2C4',
  green300: '#B5EBB4',
  green400: '#5CD565',
  green500: '#09A022',
  green600: '#06861B',
  green700: '#036626',
  green800: '#024D24',
  green900: '#01331B',

  // Red
  red100: '#FFE7E5',
  red200: '#FFB6B2',
  red300: '#FF8680',
  red400: '#FF6E66',
  red500: '#FF4238',
  red600: '#CC352D',
  red700: '#992822',
  red800: '#661A16',
  red900: '#330D0B',

  // Orange
  orange100: '#FDF9F2',
  orange200: '#FBE8CF',
  orange300: '#F9DFC2',
  orange400: '#F3AE73',
  orange500: '#E56C1C',
  orange600: '#CC6119',
  orange700: '#994913',
  orange800: '#66300D',
  orange900: '#331806',

  // Purple (300 and 500 only)
  purple300: '#A8AEFF',
  purple500: '#7355C1',

  // Yellow (300 and 500 only)
  yellow300: '#FACE59',
  yellow500: '#FFCC15',

  // Cyan (300 and 500 only)
  cyan300: '#9FDCD7',
  cyan500: '#2CDCCD',

  // Violet (300 and 500 only)
  violet300: '#D9A3F3',
  violet500: '#B431F3',

  // Base
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type Primitives = typeof primitives;
