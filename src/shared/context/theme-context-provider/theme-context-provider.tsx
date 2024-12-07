import { createContext, useContext, useState } from 'react';
import { PropsWithChildrenOnly } from '@shared/types';

type CustomThemeContextType = {
  theme: string;
  systemTheme: 'light' | 'dark';
  toggleTheme: (value: string) => void;
};

const initialCustomThemeContextValue: CustomThemeContextType = {
  systemTheme: 'light',
  theme: 'light',
  toggleTheme: (value: string) => null,
};

const ThemeContext = createContext<CustomThemeContextType>(initialCustomThemeContextValue);

export const useTheme = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }: PropsWithChildrenOnly) => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const [theme, setTheme] = useState<string>(
    //TODO: Использовать енам со значением 'system'
    localStorage.getItem('theme') === 'system'
      ? systemTheme
      //TODO: Использовать енам со значением 'light'
      : localStorage.getItem('theme') || 'light',
  );

  const toggleTheme = (value: string) => setTheme(value);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
