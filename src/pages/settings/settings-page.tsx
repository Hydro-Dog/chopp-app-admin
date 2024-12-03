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
        {data.map((elem) => (
          <SettingCard
            key={elem.path}
            path={elem.path}
            title={elem.title}
            image={elem.image}
            description={elem.description}
          />
        ))}
      </Row>
    </TitlePage>
  );
};
