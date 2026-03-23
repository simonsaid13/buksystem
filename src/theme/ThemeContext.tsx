import React, { createContext, type ReactNode } from 'react';
import { winterTokens } from './themes';
import type { ColorTokens } from './tokens';

export type ThemeName = 'winter';

export interface ThemeContextValue {
  tokens: ColorTokens;
  themeName: ThemeName;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider
 * Wrap the app root with this to provide theme tokens to all components.
 * Usage: <ThemeProvider><App /></ThemeProvider>
 *
 * Summer theme is not yet implemented — only winter is active.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeName: ThemeName = 'winter';
  const tokens = winterTokens;

  return (
    <ThemeContext.Provider value={{ tokens, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};
