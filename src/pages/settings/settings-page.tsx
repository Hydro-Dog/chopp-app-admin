import React from 'react';
import { TitlePage } from '@shared/components';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('SETTINGS')}>
      <div>SettingsPage</div>
    </TitlePage>
  );
};

export default SettingsPage;
