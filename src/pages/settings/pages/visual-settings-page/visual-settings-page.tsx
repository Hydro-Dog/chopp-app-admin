import { TitlePage, useTheme } from '@shared/index';
import { Divider } from 'antd';
import { Select } from 'antd';
import { Card } from 'antd';
import { Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const { Title } = Typography;

export const VisualSettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [themeNow, setThemeNow] = useState(() => localStorage.getItem('theme') || theme);
  const { t } = useTranslation();

  const setTheme = (value: string) => {
    if (value === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      toggleTheme(systemTheme);
      setThemeNow(systemTheme);
      localStorage.setItem('theme', 'SYSTEM_THEME'); // Сохраняем системную тему
    } else {
      toggleTheme(value);
      setThemeNow(value);
      localStorage.setItem('theme', value); // Сохраняем выбранную тему
    }
  };

  return (
    <>
      <TitlePage title={t('SETTINGS')}>
        <Card
          title={
            <Divider variant="dashed" style={{ borderColor: '	#000000' }}>
              <Title level={2}>{t('SETTINGS_PAGE.VISUAL_SETTINGS.COLOR_SETTINGS')}</Title>
            </Divider>
          }>
          <Title level={3}>{t('SETTINGS_PAGE.VISUAL_SETTINGS.THEMES')}</Title>
          <Select
            defaultValue={t(`SETTINGS_PAGE.VISUAL_SETTINGS.${themeNow.toUpperCase()}`)}
            onChange={setTheme}
            style={{ width: 120 }}
            options={[
              { value: 'dark', label: t('SETTINGS_PAGE.VISUAL_SETTINGS.DARK') },
              { value: 'light', label: t('SETTINGS_PAGE.VISUAL_SETTINGS.LIGHT') },
              { value: 'system', label: t('SETTINGS_PAGE.VISUAL_SETTINGS.SYSTEM_THEME') },
            ]}
          />
        </Card>
      </TitlePage>
    </>
  );
};
