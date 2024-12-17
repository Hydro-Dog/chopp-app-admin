import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputNumber, Checkbox, Tooltip, Alert, Form } from 'antd';

const { Item } = Form;

export const PriceSettingsEditFrom = ({ control }) => {
  const { t } = useTranslation();

  return (
    <div className="w-1/3">
      <Item label={t('PRICING_PAGE.AVERAGE_DELIVERY_COST')}>
        <Tooltip title={t('PRICING_PAGE.AVERAGE_DELIVERY_COST_TOOLTIP')}>
          <Controller
            name="averageDeliveryCost"
            control={control}
            render={({ field }) => (
              <InputNumber
                type="number"
                {...field}
                prefix="₽"
                className="w-full"
                min={0}
                placeholder={t('PRICING_PAGE.ENTER_PRICE')}
              />
            )}
          />
        </Tooltip>
      </Item>

      <Alert className="mb-2" type="info" message={t('PRICING_PAGE.PRICE_HINT')} showIcon />

      <Item>
        <Controller
          name="freeDeliveryIncluded"
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
              {t('PRICING_PAGE.FREE_SHIPPING')}
            </Checkbox>
          )}
        />
      </Item>

      <Item label={t('PRICE')}>
        <Tooltip title={t('PRICING_PAGE.DELIVERY_PRICE_TOOLTIP')}>
          <Controller
            name="freeDeliveryThreshold"
            control={control}
            render={({ field }) => (
              <InputNumber
                type="number"
                {...field}
                prefix="₽"
                className="w-full"
                min={0}
                placeholder={t('PRICING_PAGE.ENTER_PRICE')}
              />
            )}
          />
        </Tooltip>
      </Item>
    </div>
  );
};
