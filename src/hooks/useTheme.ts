import { useContext } from 'react';
import { ThemeContext } from '@theme/ThemeContext';
import type { ThemeContextValue } from '@theme/ThemeContext';

/**
 * useTheme
 * Returns the current theme's tokens and active theme name.
 * Must be used inside ThemeProvider.
 *
 * Usage:
 * const { tokens, themeName } = useTheme();
 * backgroundColor: tokens.bgCard
 */
const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};

export default useTheme;
