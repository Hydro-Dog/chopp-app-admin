import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TitlePage, useTheme } from '@shared/index';
import { Select } from 'antd';
import { Card } from 'antd';
import { Form } from 'antd';
import { THEME, STORAGE_KEYS } from '@shared/enum';

const { Item } = Form;

export const VisualSettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [pickedTheme, setPickedTheme] = useState(
    () => localStorage.getItem(STORAGE_KEYS.THEME) || theme,
  );
  const { t } = useTranslation();

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

  return (
    <TitlePage breadcrumbs title={t('SETTINGS')}>
      <Card title={t('SETTINGS_PAGE.VISUAL_SETTINGS.COLOR_SETTINGS')}>
        <Item className="w-52" label={t('THEME')}>
          <Select
            value={pickedTheme}
            onChange={(item) => onThemeChange(item)}
            options={[
              //TODO: Использовать енам со значением 'dark'
              { value: THEME.DARK, label: t('SETTINGS_PAGE.VISUAL_SETTINGS.DARK') },
              { value: THEME.LIGHT, label: t('SETTINGS_PAGE.VISUAL_SETTINGS.LIGHT') },
              { value: THEME.SYSTEM, label: t('SETTINGS_PAGE.VISUAL_SETTINGS.SYSTEM') },
            ]}
          />
        </Item>
      </Card>
    </TitlePage>
  );
};
