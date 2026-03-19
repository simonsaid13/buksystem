import React, { createContext, useState, type ReactNode } from 'react';
import { winterTokens, summerTokens } from './themes';
import type { ColorTokens } from './tokens';

export type ThemeName = 'winter' | 'summer';

export interface ThemeContextValue {
  tokens: ColorTokens;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeName;
}

/**
 * ThemeProvider
 * Wrap the app root with this to provide theme tokens to all components.
 * Usage: <ThemeProvider initialTheme="winter"><App /></ThemeProvider>
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'winter',
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(initialTheme);

  const tokens = themeName === 'winter' ? winterTokens : summerTokens;

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider value={{ tokens, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
