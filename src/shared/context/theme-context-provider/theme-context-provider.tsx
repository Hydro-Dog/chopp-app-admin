import { createContext, useContext, useState } from 'react';
import { PropsWithChildrenOnly } from '@shared/types';
import { THEME, STORAGE_KEYS } from '@shared/enum';

type CustomThemeContextType = {
  theme: string;
  systemTheme: THEME.LIGHT | THEME.DARK;
  toggleTheme: (value: string) => void;
};

const initialCustomThemeContextValue: CustomThemeContextType = {
  systemTheme: THEME.LIGHT,
  theme: THEME.LIGHT,
  toggleTheme: (value: string) => null,
};

const ThemeContext = createContext<CustomThemeContextType>(initialCustomThemeContextValue);

export const useTheme = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }: PropsWithChildrenOnly) => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME.DARK
    : THEME.LIGHT;

  const [theme, setTheme] = useState<string>(
    //TODO: Использовать енам со значением 'system'
    localStorage.getItem(STORAGE_KEYS.THEME) === THEME.SYSTEM
      ? systemTheme
      : //TODO: Использовать енам со значением 'light'
        localStorage.getItem(STORAGE_KEYS.THEME) || THEME.LIGHT,
  );

  const toggleTheme = (value: string) => setTheme(value);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
