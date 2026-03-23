import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import useTheme from '@hooks/useTheme';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';
import AppTypography from '@components/atoms/AppTypography';
import type { DSComponentEntry } from '../registry';

type Props = {
  entry: DSComponentEntry;
  onBack: () => void;
};

const DSComponentPage: React.FC<Props> = ({ entry, onBack }) => {
  const { tokens } = useTheme();
  const [expandedState, setExpandedState] = useState<string | null>(null);

  return (
    <View style={[styles.container, { backgroundColor: tokens.surface }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: tokens.dividerOnSurface }]}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <AppTypography variant="body1Highlight" color={tokens.intPrimary}>
            ← Back
          </AppTypography>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <AppTypography variant="title3" color={tokens.textOnCard}>
            {entry.name}
          </AppTypography>
          {entry.figmaPage && (
            <AppTypography variant="captionRegular" color={tokens.textOnCardSubtle}>
              {entry.figmaPage}
            </AppTypography>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        {entry.description && (
          <View style={[styles.section, { backgroundColor: tokens.bgOnSurface }]}>
            <AppTypography variant="body2" color={tokens.textOnCard}>
              {entry.description}
            </AppTypography>
          </View>
        )}

        {/* States */}
        <AppTypography variant="captionLabel" color={tokens.textOnCardSubtle}>
          States ({entry.states.length})
        </AppTypography>

        {entry.states.map((state) => {
          const isExpanded = expandedState === state.label;
          const Component = entry.component;

          return (
            <View
              key={state.label}
              style={[styles.stateCard, { backgroundColor: tokens.bgOnSurface, borderColor: tokens.strokeOnSurface }]}
            >
              <View style={styles.stateHeader}>
                <AppTypography variant="captionHighlight" color={tokens.textOnCard}>
                  {state.label}
                </AppTypography>
                <TouchableOpacity
                  onPress={() => setExpandedState(isExpanded ? null : state.label)}
                  accessibilityRole="button"
                  accessibilityLabel={isExpanded ? 'Hide props' : 'Show props'}
                >
                  <AppTypography variant="captionRegular" color={tokens.textOnCardSubtle}>
                    {isExpanded ? '▲ props' : '▼ props'}
                  </AppTypography>
                </TouchableOpacity>
              </View>

              {/* Component preview */}
              <View style={[styles.preview, { backgroundColor: tokens.bgCard }]}>
                <Component {...state.props} />
              </View>

              {/* Props (collapsible) */}
              {isExpanded && (
                <View style={[styles.propsBox, { backgroundColor: tokens.surface }]}>
                  <AppTypography variant="captionRegular" color={tokens.textOnCardSubtle}>
                    {JSON.stringify(state.props, null, 2)}
                  </AppTypography>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.large,
    borderBottomWidth: 1,
    gap: spacing.medium,
  },
  backButton: {
    padding: spacing.tiny,
  },
  headerTitle: {
    flex: 1,
    gap: 2,
  },
  content: {
    padding: spacing.large,
    gap: spacing.large,
  },
  section: {
    padding: spacing.large,
    borderRadius: radius.large,
  },
  stateCard: {
    borderRadius: radius.large,
    borderWidth: 1,
    overflow: 'hidden',
  },
  stateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.medium,
  },
  preview: {
    padding: spacing.large,
  },
  propsBox: {
    padding: spacing.medium,
    margin: spacing.medium,
    borderRadius: radius.medium,
  },
});

export default DSComponentPage;
