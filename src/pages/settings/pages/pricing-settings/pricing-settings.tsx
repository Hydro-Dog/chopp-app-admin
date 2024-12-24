import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { PriceSettingsView } from './components/price-setting-view/price-settings-view';
import { PriceSettingsEditForm } from './components/price-settings-edit-form/price-settings-edit-form';

export const PricingSettingsPage = () => {
  const { value: isEditing, toggle } = useBoolean();
  const { t } = useTranslation();

  return (
    <TitlePage breadcrumbs title={t('PRICING')}>
      <Card title={t('DELIVERY')}>
        {isEditing ? (
          <PriceSettingsEditForm toggle={toggle} />
        ) : (
          <PriceSettingsView toggle={toggle} />
        )}
      </Card>
    </TitlePage>
  );
};
