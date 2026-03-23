import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import useTheme from '@hooks/useTheme';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';
import AppTypography from '@components/atoms/AppTypography';
import type { DSComponentEntry } from '../registry';

type Props = {
  entry: DSComponentEntry;
  onPress: (entry: DSComponentEntry) => void;
};

const DSComponentCard: React.FC<Props> = ({ entry, onPress }) => {
  const { tokens } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => onPress(entry)}
      style={[styles.card, { backgroundColor: tokens.bgCard, borderColor: tokens.strokeOnSurface }]}
      accessibilityRole="button"
      accessibilityLabel={`View ${entry.name} component`}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <AppTypography variant="body2Highlight" color={tokens.textOnCard}>
            {entry.name}
          </AppTypography>
          {entry.figmaPage && (
            <View style={[styles.badge, { backgroundColor: tokens.intSecondary }]}>
              <AppTypography variant="captionLabel" color={tokens.textOnIntSubtle}>
                {entry.figmaPage}
              </AppTypography>
            </View>
          )}
        </View>
        <AppTypography variant="captionRegular" color={tokens.textOnCardSubtle}>
          →
        </AppTypography>
      </View>

      {entry.description && (
        <AppTypography variant="captionRegular" color={tokens.textOnCardSubtle}>
          {entry.description}
        </AppTypography>
      )}

      <AppTypography variant="captionRegular" color={tokens.textDisabled}>
        {entry.states.length} states
      </AppTypography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.large,
    borderWidth: 1,
    padding: spacing.large,
    gap: spacing.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.small,
    flex: 1,
  },
  badge: {
    paddingHorizontal: spacing.small,
    paddingVertical: 2,
    borderRadius: 4,
  },
});

export default DSComponentCard;
