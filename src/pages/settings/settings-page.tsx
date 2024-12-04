import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/components';
import { Row } from 'antd';
import { SettingCard } from './card-for-settings';
import { data } from './settingsData.config';

export const SettingsPage = () => {
  const { t } = useTranslation();
  return (
    <TitlePage title={t('SETTINGS')}>
      <Row>
        {data.map((item) => (
          <SettingCard
            key={item.path}
            path={item.path}
            title={item.title}
            image={item.image}
            description={item.description}
          />
        ))}
      </Row>
    </TitlePage>
  );
};
