import { createContext, useContext, useState } from 'react';
import { PropsWithChildrenOnly } from '@shared/types';
import { light } from '@mui/material/styles/createPalette';

type CustomThemeContextType = { theme: string; toggleTheme: (value: string) => void };

const initialCustomThemeContextValue: CustomThemeContextType = {
  theme: 'light',
  toggleTheme: (value: string) => null,
};

const ThemeContext = createContext<CustomThemeContextType>(initialCustomThemeContextValue);

export const useTheme = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }: PropsWithChildrenOnly) => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('colorTheme') || 'light');

  const toggleTheme = (value: string) => {
    switch (value) {
      case 'light':
        setTheme('light');
        localStorage.setItem('colorTheme', 'light');
        break;
      case 'dark':
        setTheme('dark');
        localStorage.setItem('colorTheme', 'dark');
        break;
    }
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
