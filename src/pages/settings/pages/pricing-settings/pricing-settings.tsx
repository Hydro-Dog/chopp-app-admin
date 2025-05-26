import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card, Typography } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { PriceSettingsView } from './components/price-setting-view/price-settings-view';
import { PriceSettingsEditForm } from './components/price-settings-edit-form/price-settings-edit-form';

const { Title } = Typography;

export const PricingSettingsPage = () => {
  const { t } = useTranslation();
  const { value: isEditing, toggle } = useBoolean();

  return (
    <TitlePage breadcrumbs title={t('PRICING')}>
      <div className="pb-10">
        <Card className="h-full">
          {/* <Title level={4}>{t('PRICING')}</Title> */}
          <div className="w-1/2">
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
