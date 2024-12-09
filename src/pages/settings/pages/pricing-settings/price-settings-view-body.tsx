import { useTranslation } from 'react-i18next';
import { InputNumber, Checkbox, Tooltip, Alert, Form } from 'antd';

export const PriceSettingsViewBody = () => {
  const { t } = useTranslation();
  return (
    <>
      {' '}
      <Form.Item label={<span>{t('PRICING_PAGE.AVERAGE_COST')}</span>}>
        <Tooltip title={t('PRICING_PAGE.DELIVERY_COMMENT')}>
          <InputNumber
            min={0}
            style={{ width: '30%' }}
            placeholder={t('PRICING_PAGE.ENTER_PRICE')}
          />
        </Tooltip>
      </Form.Item>
      <Alert
        type="info"
        message={t('PRICING_PAGE.PRICE_COMMENT')}
        showIcon
        style={{ marginBottom: 16, width: '30%' }}
      />
      <Form.Item>
        <Checkbox>{t('PRICING_PAGE.FREE_SHIPPING')}</Checkbox>
      </Form.Item>
      <Form.Item label={<span>{t('PRICE')}</span>}>
        <Tooltip title={t('PRICING_PAGE.PRICE_DELIVERY')}>
          <InputNumber
            min={0}
            style={{ width: '30%' }}
            placeholder={t('PRICING_PAGE.ENTER_PRICE')}
          />
        </Tooltip>
      </Form.Item>{' '}
    </>
  );
};
