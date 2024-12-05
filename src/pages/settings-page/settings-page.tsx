import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { TitlePage } from '@shared/components';
import { Row, Col } from 'antd';
import { useGetSettings } from './components/hooks';
import { SettingCard } from './components/setting-card';

export const SettingsPage = () => {
  const { t } = useTranslation();
  const data = useGetSettings();
  const location = useLocation();
  const isRootSettings = location.pathname === '/settings';

  return (
    <>
      <TitlePage title={t('SETTINGS')}>
        {isRootSettings && (
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
        )}
        <Outlet />
      </TitlePage>
    </>
  );
};
