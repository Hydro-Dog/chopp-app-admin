import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { PriceSettingsView } from './components/price-setting-view/price-settings-view';
import { PriceSettingsEditForm } from './components/price-settings-edit-form/price-settings-edit-form';
import { PriceSettingsTitle } from './components/price-settings-title';

export const PricingSettingsPage = () => {
  const { value: isEditing, toggle } = useBoolean();
  const { t } = useTranslation();

  return (
    <TitlePage breadcrumbs title={t('PRICING')}>
      <Card title={<PriceSettingsTitle isEditing={isEditing} toggleEditMode={toggle} />}>
        {isEditing ? <PriceSettingsEditForm onSuccess={toggle} /> : <PriceSettingsView />}
      </Card>
    </TitlePage>
  );
};
