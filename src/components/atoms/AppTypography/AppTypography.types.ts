import type { StyleProp, TextStyle } from 'react-native';
import type { TypographyVariant } from '@theme/typography';

export type AppTypographyProps = {
  /** Typography variant — maps directly to Figma token name */
  variant: TypographyVariant;
  /** Text color. Defaults to tokens.textOnCard */
  color?: string;
  /** Additional text style overrides */
  style?: StyleProp<TextStyle>;
  /** Number of lines before truncating with ellipsis */
  numberOfLines?: number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
};
