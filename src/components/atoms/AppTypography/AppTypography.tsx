import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { typography } from '@theme/typography';
import useTheme from '@hooks/useTheme';
import type { AppTypographyProps } from './AppTypography.types';

/**
 * AppTypography
 * The only component for rendering text in the app.
 * Maps to Figma typography token names.
 * Always sets allowFontScaling={false} to prevent OS font scaling.
 *
 * Usage:
 * <AppTypography variant="title1" color={tokens.textOnCard}>Hello</AppTypography>
 * <AppTypography variant="ctaLarge">Book Now</AppTypography>
 */
const AppTypography: React.FC<AppTypographyProps> = ({
  variant,
  color,
  style,
  numberOfLines,
  align = 'left',
  children,
}) => {
  const { tokens } = useTheme();
  const variantStyle = typography[variant];

  return (
    <Text
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        {
          fontFamily: `${variantStyle.fontFamily}_${getFontKey(variantStyle.fontWeight)}`,
          fontWeight: variantStyle.fontWeight as any,
          fontSize: variantStyle.fontSize,
          lineHeight: variantStyle.lineHeight,
          letterSpacing: variantStyle.letterSpacing,
          textTransform: variantStyle.textTransform,
          textAlign: align,
          color: color ?? tokens.textOnCard,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

/**
 * Maps numeric fontWeight to the Bukovel font family key used in useFonts().
 * Keys must match what's registered in app/_layout.tsx.
 */
function getFontKey(weight: string): string {
  switch (weight) {
    case '200':
      return 'ExtraLight';
    case '300':
      return 'Light';
    case '400':
      return 'Regular';
    case '500':
      return 'Medium';
    case '600':
      return 'SemiBold';
    case '700':
      return 'Bold';
    default:
      return 'Regular';
  }
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});

export default AppTypography;
