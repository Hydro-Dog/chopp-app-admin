import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePaymentsContext } from '@pages/payments/context';
import { Select, Space } from 'antd';

const { Option } = Select;

export const PaymentsStatusFilter = () => {
  const { t } = useTranslation();
  const { status, setStatus } = usePaymentsContext();

  const handleStatusChange = useCallback(
    (value: string) => {
      setStatus(value || '');
    },
    [setStatus],
  );

  return (
    <Space direction="vertical" size={12}>
      <Select
        placeholder={t('PICK_STATUS')}
        onChange={handleStatusChange}
        value={status || undefined}
        allowClear>
        <Option value="succeeded">{t('PAYMENT_STATUS.SUCCEEDED')}</Option>
        <Option value="canceled">{t('PAYMENT_STATUS.CANCELED')}</Option>
      </Select>
    </Space>
  );
};
