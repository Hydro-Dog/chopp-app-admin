import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePaymentsContext } from '@pages/payments/context';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

const sharedProps: SelectProps = {
  mode: 'multiple',
  maxTagCount: 'responsive',
};

export const PaymentsStatusFilter = () => {
  const { t } = useTranslation();
  const { status, setStatus } = usePaymentsContext();

  const handleStatusChange = useCallback(
    (value: string | string[]) => {
      setStatus(Array.isArray(value) ? value.join(',') : value);
    },
    [setStatus],
  );

  const items = [
    { value: 'succeeded', label: t('PAYMENT_STATUS.SUCCEEDED') },
    { value: 'canceled', label: t('PAYMENT_STATUS.CANCELED') },
  ];

  return (
    <div className="flex mb-3 items-center mt-2">
      <Select
        {...sharedProps}
        defaultValue={items.map((item) => item.value)}
        value={status ? status.split(',') : []}
        className="w-full"
        onChange={handleStatusChange}
        options={items}
        showSearch={false}
      />
    </div>
  );
};
