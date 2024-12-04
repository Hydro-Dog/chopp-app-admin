import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/components';

export const AnalyticsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('ANALYTICS')}>
      <div>hello</div>
    </TitlePage>
  );
};
