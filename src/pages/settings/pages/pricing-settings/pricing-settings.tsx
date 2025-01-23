import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { PriceSettingsView } from './components/price-setting-view/price-settings-view';
import { PriceSettingsEditForm } from './components/price-settings-edit-form/price-settings-edit-form';

export const PricingSettingsPage = () => {
  const { t } = useTranslation();
  const { value: isEditing, toggle } = useBoolean();

  return (
    <TitlePage breadcrumbs title={t('PRICING')}>
      <div className="h-full pb-10">
        <Card className="h-full" title={t('DELIVERY')}>
          <div className="w-1/3">
            {isEditing ? (
              <PriceSettingsEditForm toggle={toggle} />
            ) : (
              <PriceSettingsView toggle={toggle} />
            )}
          </div>
        </Card>
      </div>
    </TitlePage>
  );
};
