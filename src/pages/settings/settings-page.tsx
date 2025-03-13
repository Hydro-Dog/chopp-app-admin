import { useTranslation } from 'react-i18next';
import { TitlePage, useThemeToken } from '@shared/index';
import { Row, Col, Switch, Card, Typography } from 'antd';
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
        className={`!w-96 !h-36 fixed bottom-10 right-4 border-2`}
        style={{ borderColor: themeToken.colorPrimaryBorder }}>
        <Paragraph strong>{t('SETTINGS_PAGE.SWITCH_OFF')}</Paragraph>
        <Switch defaultChecked />
      </Card>
    </TitlePage>
  );
};
