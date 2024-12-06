import { TitlePage, useTheme } from '@shared/index';
import { Divider } from 'antd';
import { Select } from 'antd';
import { Card } from 'antd';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetVisualSettings } from './hooks';
const { Title } = Typography;

export const VisualSettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [pickedTheme, setPickedTheme] = useState(() => localStorage.getItem('theme') || theme);
  const { t } = useTranslation();
  const info = useGetVisualSettings({ theme: pickedTheme.toUpperCase() });

  useEffect(() => {
    if (pickedTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      toggleTheme(systemTheme);
      localStorage.setItem('theme', 'SYSTEM'); // Сохраняем системную тему
    } else {
      toggleTheme(pickedTheme);
      localStorage.setItem('theme', pickedTheme); // Сохраняем выбранную тему
    }
  }, [pickedTheme]);

  return (
    <>
      <TitlePage title={t('SETTINGS')}>
        <Card
          title={
            <Divider variant="dashed" style={{ borderColor: '	#000000' }}>
              <Title level={2}>{info.title}</Title>
            </Divider>
          }>
          <Title level={3}>{info.clue}</Title>
          <Select
            defaultValue={info.defaultValue}
            onChange={(item) => setPickedTheme(item)}
            className=" w-36"
            options={[
              { value: 'dark', label: info.dark },
              { value: 'light', label: info.light },
              { value: 'system', label: info.system },
            ]}
          />
        </Card>
      </TitlePage>
    </>
  );
};
