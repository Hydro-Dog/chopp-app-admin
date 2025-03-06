import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePaymentsContext } from '@pages/payments/context';
import { ChoppPaymentStatus } from '@shared/components';
import { PAYMENT_STATUS } from '@shared/enum';
import { Select, Tag } from 'antd';
import type { SelectProps } from 'antd';

const sharedProps: SelectProps = {
  mode: 'multiple',
  maxTagCount: 'responsive',
};

export const PaymentsStatusFilter = () => {
  const { t } = useTranslation();
  const { status, setStatus } = usePaymentsContext();

  const all = 'all';
  const statusArray = Object.values(PAYMENT_STATUS);

  const handleStatusChange = useCallback(
    (value: string[]) => {
      if (value.includes(all)) {
        const newStatus = statusArray.length === status.split(',').length ? [] : statusArray;
        setStatus(newStatus.join(','));
      } else {
        setStatus(value.join(','));
      }
    },
    [setStatus, status, statusArray],
  );

  const items = [
    {
      value: all,
      label: <Tag color="black">{t('ORDERS_PAGE.CHOOSE_ALL')}</Tag>,
    },
    ...statusArray.map((status) => ({
      value: status,
      label: <ChoppPaymentStatus status={status} />,
    })),
  ];

  return (
    <div className="flex mb-3 w-1/3 items-center mt-2">
      <Select
        {...sharedProps}
        value={status ? status.split(',') : []}
        className="w-full"
        onChange={handleStatusChange}
        options={items}
        showSearch={false}
      />
    </div>
  );
};
