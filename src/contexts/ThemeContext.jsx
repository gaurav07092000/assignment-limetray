import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { THEMES } from '../utils/constants';
import { useEffect } from 'react';

// Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', THEMES.LIGHT);

  // Toggle Theme Function
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => 
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  }, [setTheme]);

  // Apply theme to document
  useEffect(() => {
    if (theme === THEMES.DARK) {
      document.body.style.backgroundColor = '#1e293b';
      document.body.style.color = '#f1f5f9';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1e293b';
    }
  }, [theme]);

  // Context Value (Memoized for performance)
  const value = useMemo(() => ({
    theme,
    toggleTheme,
    isDark: theme === THEMES.DARK
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use Theme Context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;