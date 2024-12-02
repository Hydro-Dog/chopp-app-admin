import React from 'react';
import { TitlePage } from '@shared/components';
import { useTranslation } from 'react-i18next';

const AnalyticsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('ANALYTICS')}>
      <div>hello</div>
    </TitlePage>
  );
};

export default AnalyticsPage;
