import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TitlePage, useTheme } from '@shared/index';
import { Select } from 'antd';
import { Card } from 'antd';
import { Form } from 'antd';

const { Item } = Form;

export const VisualSettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [pickedTheme, setPickedTheme] = useState(() => localStorage.getItem('theme') || theme);
  const { t } = useTranslation();

  const onThemeChange = (val: string) => {
    //TODO: Использовать енам со значением 'system'
    if (val === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      toggleTheme(systemTheme);
      //TODO: Использовать енам со значением 'system'
      localStorage.setItem('theme', 'system');
    } else {
      toggleTheme(val);
      localStorage.setItem('theme', val);
    }

    setPickedTheme(val);
  };

  return (
    <TitlePage title={t('SETTINGS')}>
      <Card title={t('SETTINGS_PAGE.VISUAL_SETTINGS.COLOR_SETTINGS')}>
        <Item className="w-52" label={t('THEME')}>
          <Select
            value={pickedTheme}
            onChange={(item) => onThemeChange(item)}
            options={[
              //TODO: Использовать енам со значением 'dark'
              { value: 'dark', label: t('SETTINGS_PAGE.VISUAL_SETTINGS.DARK') },
              { value: 'light', label: t('SETTINGS_PAGE.VISUAL_SETTINGS.LIGHT') },
              { value: 'system', label: t('SETTINGS_PAGE.VISUAL_SETTINGS.SYSTEM') },
            ]}
          />
        </Item>
      </Card>
    </TitlePage>
  );
};
