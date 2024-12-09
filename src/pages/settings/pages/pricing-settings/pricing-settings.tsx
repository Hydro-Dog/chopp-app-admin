import { useTranslation } from 'react-i18next';
import { SettingCardComponent } from '@shared/components/setting-card/setting-card';
import { TitlePage } from '@shared/index';
import { PriceSettingsEditBody } from './price-settings-edit-body';
import { PriceSettingsViewBody } from './price-settings-view-body';

export const PricingSettingsPage = () => {
  const { t } = useTranslation();
  return (
    <TitlePage title={t('PRICING')}>
      <SettingCardComponent
        cardTitle={t('PRICING_PAGE.DELIVERY_OPTIONS')}
        editChildren={<PriceSettingsEditBody />}
        viewChildren={<PriceSettingsViewBody />}
      />
    </TitlePage>
  );
};
