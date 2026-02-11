// Theme Context for Place Packet design tokens

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TokenSet, ContextKey, getContext, spatialStudioCore } from '@/tokens';

interface ThemeContextValue {
  // Current active theme
  theme: TokenSet;

  // Switch to a heritage context
  setContext: (contextKey: ContextKey) => void;

  // Reset to Spatial Studio core
  resetToCore: () => void;

  // Current context key (or 'core' for Spatial Studio)
  currentContext: ContextKey | 'core';
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultContext?: ContextKey | 'core';
}

export function ThemeProvider({ children, defaultContext = 'core' }: ThemeProviderProps) {
  const [currentContext, setCurrentContext] = useState<ContextKey | 'core'>(defaultContext);

  // Get initial theme
  const initialTheme = defaultContext === 'core'
    ? spatialStudioCore
    : getContext(defaultContext);

  const [theme, setTheme] = useState<TokenSet>(initialTheme);

  const setContext = (contextKey: ContextKey) => {
    const newTheme = getContext(contextKey);
    setTheme(newTheme);
    setCurrentContext(contextKey);
  };

  const resetToCore = () => {
    setTheme(spatialStudioCore);
    setCurrentContext('core');
  };

  return (
    <ThemeContext.Provider value={{ theme, setContext, resetToCore, currentContext }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function usePlacePacketTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('usePlacePacketTheme must be used within ThemeProvider');
  }
  return context;
}

// HOC to inject theme as props
export function withTheme<P extends object>(
  Component: React.ComponentType<P & { theme: TokenSet }>
) {
  return function ThemedComponent(props: P) {
    const { theme } = usePlacePacketTheme();
    return <Component {...props} theme={theme} />;
  };
}
