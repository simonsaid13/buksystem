import React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import useTheme from '@hooks/useTheme';
import AppTypography from '@components/atoms/AppTypography';
import AppIcon from '@components/atoms/AppIcon';
import type { TypographyVariant } from '@theme/typography';
import { createStyles, getButtonMetrics } from './AppButton.styles';
import type { AppButtonProps } from './AppButton.types';

/**
 * AppButton
 * Primary / secondary pill buttons from Figma (`AppButtonBig`, `AppButtonSmall`).
 * Layouts: `text`, `iconLeading`, `priceCta`. Pressed state darkens the fill; disabled uses `intDisabled`.
 *
 * Usage:
 * <AppButton onPress={() => {}}>Забронювати</AppButton>
 * <AppButton size="small" variant="secondary" layout="iconLeading" leadingIconName="Plus">Додати</AppButton>
 * <AppButton layout="priceCta" priceLabel="Оплатити частинами" priceAmount="1 600 ₴" />
 */
const AppButton: React.FC<AppButtonProps> = ({
  variant = 'primary',
  size = 'large',
  layout = 'text',
  isDisabled = false,
  isPressed: isPressedProp = false,
  isLoading = false,
  onPress,
  children,
  leadingIconName = 'Plus',
  priceLabel,
  priceAmount,
}) => {
  const { tokens } = useTheme();
  const styles = createStyles();
  const metrics = getButtonMetrics(size, layout);

  const typographyVariant: TypographyVariant = size === 'large' ? 'ctaLarge' : 'ctaRegular';

  const isInactive = isDisabled || isLoading;

  const labelColor = isDisabled ? tokens.textDisabled : tokens.textOnCard;

  const backgroundColor = (isPressed: boolean): string => {
    if (isDisabled) {
      return tokens.intDisabled;
    }
    if (variant === 'primary') {
      return isPressed ? tokens.intPrimaryPressed : tokens.intPrimary;
    }
    return isPressed ? tokens.intSecondaryPressed : tokens.intSecondary;
  };

  const iconColor = isDisabled ? tokens.textDisabled : tokens.textOnCard;

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator color={labelColor} accessibilityLabel="Loading" />;
    }

    if (layout === 'priceCta') {
      return (
        <View style={[styles.inlineRow, { gap: metrics.columnGap }]}>
          <AppTypography variant={typographyVariant} color={labelColor}>
            {priceLabel ?? ''}
          </AppTypography>
          <View style={[styles.dot, { backgroundColor: labelColor }]} />
          <AppTypography variant={typographyVariant} color={labelColor}>
            {priceAmount ?? ''}
          </AppTypography>
        </View>
      );
    }

    if (layout === 'iconLeading') {
      return (
        <View style={[styles.inlineRow, { gap: metrics.columnGap }]}>
          <AppIcon name={leadingIconName} size={20} color={iconColor} strokeWidth={2} isDecorative />
          <AppTypography variant={typographyVariant} color={labelColor}>
            {children}
          </AppTypography>
        </View>
      );
    }

    return (
      <AppTypography variant={typographyVariant} color={labelColor}>
        {children}
      </AppTypography>
    );
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      disabled={isInactive}
      onPress={isInactive ? undefined : onPress}
      style={({ pressed }) => {
        const showPressed = !isInactive && (pressed || isPressedProp);
        return [
          styles.pressable,
          {
            backgroundColor: backgroundColor(showPressed),
            paddingVertical: metrics.paddingVertical,
            paddingHorizontal: metrics.paddingHorizontal,
            minHeight: metrics.minHeight,
          },
        ];
      }}
    >
      {renderContent()}
    </Pressable>
  );
};

export default AppButton;
