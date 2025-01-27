import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Form, Card } from 'antd';
import { useBoolean } from 'usehooks-ts';
import {PaymentSettingsView} from './components/payment-settings-view';
import {PaymentSettingsTitle} from './components/payment-settings-title';
import {PaymentSettingsEditForm} from './components/payment-settings-edit-form';

export const PaymentSettingsPage = () => {
    const { value: isEditing, toggle } = useBoolean();
    const { t } = useTranslation();
  
    return (
      <TitlePage breadcrumbs title={t('PAYMENT')}>
        <Card title={<PaymentSettingsTitle isEditing={isEditing} toggleEditMode={toggle} />}>
          <Form layout="vertical" size="large">
            {isEditing ? <PaymentSettingsEditForm/> : <PaymentSettingsView />}
          </Form>
          
        </Card>
      </TitlePage>
    );
  };