import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePaymentsContext } from '@pages/payments/context';
import { ChoppPaymentStatus } from '@shared/components';
import { PAYMENT_STATUS } from '@shared/enum';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

const sharedProps: SelectProps = {
  maxTagCount: 'responsive',
};

export const PaymentsStatusFilter = () => {
  const { t } = useTranslation();
  const { status, setStatus } = usePaymentsContext();

  const statusArray = [PAYMENT_STATUS.SUCCEEDED, PAYMENT_STATUS.CANCELED];

  const handleStatusChange = useCallback(
    (value: string | undefined) => {
      setStatus(value ?? '');
    },
    [setStatus],
  );

  const items = statusArray.map((status) => ({
    value: status,
    label: <ChoppPaymentStatus status={status} />,
  }));

  return (
    <div className="flex mb-3 w-1/3 items-center">
      <Select
        prefix={t('ORDERS_PAGE.CHOSEN_STATUS')}
        {...sharedProps}
        value={status || undefined}
        className="w-full"
        onChange={handleStatusChange}
        options={items}
        showSearch={false}
        allowClear
      />
    </div>
  );
};
