import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';
import type { ColorTokens } from '@theme/tokens';

/** Fixed cell size from Figma (32×32px). */
export const CELL_SIZE = 32;

export const createStyles = (tokens: ColorTokens) =>
  StyleSheet.create({
    container: {
      backgroundColor: tokens.bgCard,
      padding: spacing.large,
      gap: spacing.small,
    },

    // ── Month header ────────────────────────────────────────────
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.large,
      paddingVertical: spacing.tiny,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
    },
    arrowButton: {
      width: CELL_SIZE,
      height: CELL_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
    },

    // ── Day-of-week row ─────────────────────────────────────────
    weekRow: {
      flexDirection: 'row',
    },
    weekCell: {
      flex: 1,
      height: CELL_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
    },

    // ── Week rows ───────────────────────────────────────────────
    dateRow: {
      flexDirection: 'row',
    },

    // ── Individual date cells ───────────────────────────────────
    /** Outer cell wrapper — fills the 1/7 column slot. */
    cellOuter: {
      flex: 1,
      height: CELL_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
    },

    /** The teal filled circle for start/end/only. */
    selectedCircle: {
      width: CELL_SIZE - spacing.tiny,   // 28px (Figma: 28px circle)
      height: CELL_SIZE - spacing.tiny,
      borderRadius: radius.full,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
    },

    // ── Loading skeleton ────────────────────────────────────────
    skeletonRow: {
      flexDirection: 'row',
      gap: spacing.tiny,
    },
    skeletonCell: {
      flex: 1,
      height: CELL_SIZE,
      borderRadius: radius.medium,
    },
  });
