import { useTranslation } from 'react-i18next';
import { SettingCardComponent } from '@shared/components/setting-card/setting-card';
import { TitlePage } from '@shared/index';
import { useBoolean } from 'usehooks-ts';
import { PriceSettingsEditBody } from './components/price-settings-edit-body';
import { PriceSettingsViewBody } from './components/price-settings-view-body';
import { PricingTitleBlock } from './components/pricing-title-block';

export const PricingSettingsPage = () => {
  const { value: isEditing, toggle } = useBoolean();
  const { t } = useTranslation();

  return (
    <TitlePage title={t('PRICING')}>
      <SettingCardComponent
        cardTitleComponent={<PricingTitleBlock isEditing={isEditing} toggleEditMode={toggle} />}>
        {isEditing ? <PriceSettingsEditBody /> : <PriceSettingsViewBody />}
      </SettingCardComponent>
    </TitlePage>
  );
};
