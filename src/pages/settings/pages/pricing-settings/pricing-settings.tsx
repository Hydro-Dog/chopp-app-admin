import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Form, Card } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { PriceSettingsTitle } from './components';
import { PriceSettingsViewBody } from './components/price-setting-view-body/price-settings-view-body';
import { PriceSettingsEditBody } from './components/price-settings-edit-body/price-settings-edit-body';

export const PricingSettingsPage = () => {
  const { value: isEditing, toggle } = useBoolean();
  const { t } = useTranslation();

  return (
    <TitlePage title={t('PRICING')}>
      <Card title={<PriceSettingsTitle isEditing={isEditing} toggleEditMode={toggle} />}>
        <Form layout="vertical" size="large">
          {isEditing ? <PriceSettingsEditBody /> : <PriceSettingsViewBody />}
        </Form>
      </Card>
    </TitlePage>
  );
};
