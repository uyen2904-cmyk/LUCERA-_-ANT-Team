import React, { createContext, useContext, useState, useEffect } from 'react';

export type VisualTheme = 'dark' | 'pastel';

interface ThemeContextType {
  theme: VisualTheme;
  isPastel: boolean;
  toggleTheme: () => void;
  setTheme: (theme: VisualTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  isPastel: false,
  toggleTheme: () => {},
  setTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<VisualTheme>(() => {
    try {
      const saved = localStorage.getItem('lucera_visual_theme');
      if (saved === 'pastel' || saved === 'dark') {
        return saved;
      }
    } catch {}
    return 'dark';
  });

  const isPastel = theme === 'pastel';

  const setTheme = (newTheme: VisualTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('lucera_visual_theme', newTheme);
    } catch {}
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'pastel' : 'dark');
  };

  useEffect(() => {
    try {
      if (theme === 'pastel') {
        document.documentElement.classList.add('theme-pastel');
        document.documentElement.classList.remove('theme-dark');
      } else {
        document.documentElement.classList.add('theme-dark');
        document.documentElement.classList.remove('theme-pastel');
      }
    } catch {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, isPastel, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
