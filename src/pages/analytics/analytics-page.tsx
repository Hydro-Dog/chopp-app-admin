import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/components';
import { AnalyticsChart } from './components/analytics-chart';
import { AnalyticsTopPanel } from './components';
import { Card } from 'antd';
export const AnalyticsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('ANALYTICS')}>
      <Card className="h-full" size="small">
        <AnalyticsTopPanel />
        <AnalyticsChart />
      </Card>
    </TitlePage>
  );
};
