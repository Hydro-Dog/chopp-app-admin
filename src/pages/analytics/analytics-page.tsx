import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/components';
import { AnalyticsChart } from './components/analytics-chart';

export const AnalyticsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('ANALYTICS')}>
      <AnalyticsChart />
    </TitlePage>
  );
};
