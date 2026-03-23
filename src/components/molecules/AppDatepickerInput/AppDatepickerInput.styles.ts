import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';
import type { ColorTokens } from '@theme/tokens';

export const createStyles = (tokens: ColorTokens) =>
  StyleSheet.create({
    wrapper: {
      gap: spacing.medium,
    },

    // ── Input pill ───────────────────────────────────────────────
    pill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.medium,
      paddingVertical: spacing.medium,
      paddingHorizontal: spacing.large,
      borderRadius: radius.full,
    },
    pillDefault: {
      backgroundColor: tokens.intSecondary,
    },
    pillActive: {
      backgroundColor: tokens.intSecondaryPressed,
    },
    pillText: {
      flex: 1,
    },

    // ── Calendar panel ────────────────────────────────────────────
    calendarPanel: {
      backgroundColor: tokens.bgCard,
      borderRadius: radius.3,
      overflow: 'hidden',
    },
  });
