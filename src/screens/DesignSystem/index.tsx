import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import useTheme from '@hooks/useTheme';
import { spacing } from '@theme/spacing';
import AppTypography from '@components/atoms/AppTypography';
import DSSearchBar from './components/DSSearchBar';
import DSTabBar from './components/DSTabBar';
import DSComponentCard from './components/DSComponentCard';
import DSComponentPage from './components/DSComponentPage';
import { componentRegistry } from './registry';
import type { DSComponentEntry, DSCategory } from './registry';
import type { DSFilter } from './components/DSTabBar';

/**
 * DesignSystemScreen
 * Main app entry during development.
 * Shows all components with all states. Searchable and filterable.
 */
const DesignSystemScreen: React.FC = () => {
  const { tokens, themeName, setTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<DSFilter>('all');
  const [selectedEntry, setSelectedEntry] = useState<DSComponentEntry | null>(null);

  // Build tabs dynamically from registry
  const tabs: DSFilter[] = useMemo(() => {
    const categories = Array.from(new Set(componentRegistry.map((e) => e.category)));
    const figmaPages = Array.from(
      new Set(componentRegistry.map((e) => e.figmaPage).filter(Boolean))
    ) as string[];
    return ['all', ...categories, ...figmaPages];
  }, []);

  const filteredEntries = useMemo(() => {
    const query = search.toLowerCase();
    return componentRegistry.filter((entry) => {
      const matchesSearch =
        !query ||
        entry.name.toLowerCase().includes(query) ||
        (entry.figmaPage?.toLowerCase().includes(query) ?? false) ||
        (entry.description?.toLowerCase().includes(query) ?? false);

      const matchesTab =
        activeTab === 'all' ||
        entry.category === activeTab ||
        entry.figmaPage === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  if (selectedEntry) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: tokens.bgSurface }]}>
        <DSComponentPage
          entry={selectedEntry}
          onBack={() => setSelectedEntry(null)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: tokens.bgSurface }]}>
      {/* Top bar */}
      <View style={[styles.topBar, { borderBottomColor: tokens.dividerOnSurface }]}>
        <View style={styles.titleRow}>
          <AppTypography variant="title2" color={tokens.textOnCard}>
            Design System
          </AppTypography>
          <AppTypography variant="captionRegular" color={tokens.textOnCardSecondary}>
            {componentRegistry.length} components
          </AppTypography>
        </View>

        {/* Theme toggle */}
        <TouchableOpacity
          onPress={() => setTheme(themeName === 'winter' ? 'summer' : 'winter')}
          style={[styles.themeToggle, { backgroundColor: tokens.intSecondary }]}
          accessibilityRole="switch"
          accessibilityLabel={`Switch to ${themeName === 'winter' ? 'summer' : 'winter'} theme`}
        >
          <AppTypography variant="captionHighlight" color={tokens.textOnIntSecondary}>
            {themeName === 'winter' ? '❄️ Winter' : '☀️ Summer'}
          </AppTypography>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <DSSearchBar value={search} onChangeText={setSearch} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <DSTabBar tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab} />
      </View>

      {/* Component list */}
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DSComponentCard entry={item} onPress={setSelectedEntry} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <AppTypography variant="body2" color={tokens.textDisabled} align="center">
              No components found for "{search}"
            </AppTypography>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
  },
  titleRow: {
    gap: 2,
  },
  themeToggle: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: 20,
  },
  searchContainer: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.medium,
  },
  tabsContainer: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.small,
  },
  list: {
    padding: spacing.screenPadding,
    gap: spacing.medium,
  },
  empty: {
    paddingTop: spacing.xxxLarge,
  },
});

export default DesignSystemScreen;
