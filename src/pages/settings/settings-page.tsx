import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Row, Col } from 'antd';
import { SettingCard } from './components';
import { useGetSettings } from './hooks';

export const SettingsPage = () => {
  const { t } = useTranslation();
  const settingsList = useGetSettings();

  return (
    <TitlePage breadcrumbs title={t('SETTINGS')}>
      <Row gutter={[24, 24]} className="px-2">
        {settingsList.map((item) => (
          <Col key={item.path}>
            <SettingCard
              path={item.path}
              title={item.title}
              image={item.image}
              description={item.description}
            />
          </Col>
        ))}
      </Row>
    </TitlePage>
  );
};
