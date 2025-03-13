import { useTranslation } from 'react-i18next';
import { ChoppTextWithTooltip, TitlePage } from '@shared/index';
import { Row, Col, Switch, Card, Flex } from 'antd';
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
      <Card
        style={{
          width: 240,
          position: 'fixed',
          bottom: '40px',
          right: '16px',
        }}>
        <Flex vertical gap={4}>
          <ChoppTextWithTooltip
            title={t('SETTINGS_PAGE.TURN_OFF_TITLE')}
            tooltipText={t('SETTINGS_PAGE.TURN_OFF_DESCRIPTION')}
          />
          <Switch className="w-fit" defaultChecked />
        </Flex>
      </Card>
    </TitlePage>
  );
};
