import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/components';
import { Row, Col } from 'antd';
import { SettingCard } from './components/setting-card';
import { useGetSettings } from './components/hooks';

export const SettingsPage = () => {
  const { t } = useTranslation();
  const data = useGetSettings();

  return (
    <>
      <TitlePage title={t('SETTINGS')}>
        <Row gutter={[24, 24]}>
          {data.map((item) => (
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
    </>
  );
};
