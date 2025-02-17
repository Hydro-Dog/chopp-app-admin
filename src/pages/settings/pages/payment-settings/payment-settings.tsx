import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { PaymentSettingsView } from './components/payment-settings-view';
import { PaymentSettingsEditForm } from './components/payment-settings-edit-form';

export const PaymentSettingsPage = () => {
  const { value: isEditing, toggle } = useBoolean();
  const { t } = useTranslation();

  return (
    <TitlePage breadcrumbs title={t('PAYMENT_SETTINGS')}>
      <div className="h-full pb-10">
        <Card className="h-full" title={t('PAYMENT_SETTINGS_DATA')}>
          <div className="w-1/3">
            {isEditing ? (
              <PaymentSettingsEditForm toggle={toggle} />
            ) : (
              <PaymentSettingsView toggle={toggle} />
            )}
          </div>
        </Card>
      </div>
    </TitlePage>
  );
};
