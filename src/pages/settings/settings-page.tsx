import { useTranslation } from 'react-i18next';
import { TitlePage, useThemeToken } from '@shared/index';
import { Row, Col, Typography, Switch, Card } from 'antd';
import { SettingCard } from './components';
import { useGetSettings } from './hooks';
const { Paragraph } = Typography;

export const SettingsPage = () => {
  const { t } = useTranslation();
  const settingsList = useGetSettings();
  const themeToken = useThemeToken();

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
      <Card
        style={{
          width: 240,
          position: 'fixed',
          bottom: '40px',
          right: '16px',
          border: `2px solid ${themeToken.colorPrimaryBorder}`,
        }}>
        <Paragraph strong>{t('SETTINGS_PAGE.SWITCH_OFF')}</Paragraph>
        <Switch defaultChecked />
      </Card>
    </TitlePage>
  );
};
