import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';
import type { AppButtonLayout, AppButtonSize } from './AppButton.types';

type Metrics = {
  paddingVertical: number;
  paddingHorizontal: number;
  columnGap: number;
  minHeight?: number;
};

/**
 * Padding and gaps from Figma AppButtonBig / AppButtonSmall.
 * Vertical padding for small `iconLeading` is 8px in the scale (Figma shows 10px).
 */
export function getButtonMetrics(size: AppButtonSize, layout: AppButtonLayout): Metrics {
  if (size === 'large') {
    const base = {
      paddingVertical: spacing.large,
      paddingHorizontal: spacing.xxLarge,
      columnGap: spacing.small,
    };
    if (layout === 'priceCta') {
      return { ...base, columnGap: spacing.tiny };
    }
    return base;
  }

  if (layout === 'iconLeading') {
    return {
      paddingVertical: spacing.small,
      paddingHorizontal: spacing.large,
      columnGap: spacing.small,
    };
  }

  return {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    columnGap: layout === 'priceCta' ? spacing.tiny : spacing.small,
    minHeight: spacing.xxxxLarge,
  };
}

export const createStyles = () =>
  StyleSheet.create({
    pressable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      borderRadius: radius.full,
    },
    inlineRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dot: {
      width: spacing.tiny,
      height: spacing.tiny,
      borderRadius: radius.full,
    },
  });
