import { TitlePage } from '@shared/components';
import { useTranslation } from 'react-i18next';
import React from 'react';

const SettingsPage = () => {
  const { t } = useTranslation();
  return (
    <TitlePage title={t('SETTINGS')}>
      <div>SettingsPage</div>
    </TitlePage>
  );
};

export default SettingsPage;
