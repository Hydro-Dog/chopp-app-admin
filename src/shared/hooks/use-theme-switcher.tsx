import { useState } from 'react';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { STORAGE_KEYS, THEME } from '@shared/enum';
import { useTheme } from '@shared/index';
import { Switch } from 'antd';

export const useThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const [pickedTheme, setPickedTheme] = useState(
    () => localStorage.getItem(STORAGE_KEYS.THEME) || theme,
  );

  const onThemeChange = (val: string) => {
    //TODO: Использовать енам со значением 'system'
    if (val === THEME.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEME.DARK
        : THEME.LIGHT;
      toggleTheme(systemTheme);
      //TODO: Использовать енам со значением 'system'
      localStorage.setItem(STORAGE_KEYS.THEME, THEME.SYSTEM);
    } else {
      toggleTheme(val);
      localStorage.setItem(STORAGE_KEYS.THEME, val);
    }

    setPickedTheme(val);
  };

  return {
    themeSwitcher: (
      <Switch
        className="w-fit"
        value={pickedTheme === THEME.LIGHT}
        onChange={(val) => onThemeChange(val ? THEME.LIGHT : THEME.DARK)}
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        defaultChecked
      />
    ),
  };
};
