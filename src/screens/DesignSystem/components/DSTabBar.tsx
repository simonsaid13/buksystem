import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import useTheme from '@hooks/useTheme';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';
import AppTypography from '@components/atoms/AppTypography';
import type { DSCategory } from '../registry';

export type DSFilter = DSCategory | 'all' | string;

type Props = {
  tabs: DSFilter[];
  activeTab: DSFilter;
  onTabPress: (tab: DSFilter) => void;
};

const DSTabBar: React.FC<Props> = ({ tabs, activeTab, onTabPress }) => {
  const { tokens } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabPress(tab)}
            style={[
              styles.tab,
              {
                backgroundColor: isActive ? tokens.intPrimary : tokens.bgOnSurface,
                borderColor: isActive ? tokens.intPrimary : tokens.strokeOnSurface,
              },
            ]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <AppTypography
              variant="captionHighlight"
              color={isActive ? tokens.textOnInt : tokens.textOnCard}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </AppTypography>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.small,
    paddingVertical: spacing.tiny,
  },
  tab: {
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.small,
    borderRadius: radius.full,
    borderWidth: 1,
  },
});

export default DSTabBar;
