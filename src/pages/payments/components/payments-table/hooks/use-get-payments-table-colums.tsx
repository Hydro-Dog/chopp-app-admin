import { useTranslation } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';
import { PAYMENT_STATUS, ChoppPaymentStatus, ChoppTextWithTooltip } from '@shared/index';
import { Payment } from '@shared/types/payment';
import { Checkbox, Dropdown, Space, Typography } from 'antd';
import { useGetActionItems } from './use-get-action-items';
import { ACTION_MENU_ITEMS } from '../enums';
import { ActionValue } from '../types';

const { Text } = Typography;

type Args = {
  onActionClick: (info: ActionValue) => void;
};

export const useGetPaymentsTableColumns = ({ onActionClick }: Args) => {
  const { t } = useTranslation();
  const { actionItems } = useGetActionItems();

  const columns = [
    {
      title: (
        <ChoppTextWithTooltip
          title={t('TRANSACTION_ID')}
          tooltipText={t('TRANSACTION_ID_TOOLTIP')}
        />
      ),
      dataIndex: 'id',
      className: 'cursor-pointer',
      key: 'id',
      render: (text: string) => (
        <ChoppTextWithTooltip showInfoIcon={false} copyable title={text} tooltipText={text} />
      ),
    },
    {
      title: t('PAYMENT_STATUS_TITLE'),
      dataIndex: 'status',
      key: 'status',
      render: (status: PAYMENT_STATUS) => <ChoppPaymentStatus status={status} />,
    },
    {
      title: t('AMOUNT'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount?: { value: string; currency: string }) =>
        amount
          ? Number(amount.value)?.toLocaleString('ru-RU', {
              style: 'currency',
              currency: amount.currency || 'RUB',
            })
          : '—',
    },
    {
      title: (
        <ChoppTextWithTooltip
          title={t('REFUNDED_AMOUNT')}
          tooltipText={t('REFUNDED_AMOUNT_VERBOSE')}
        />
      ),
      dataIndex: 'refunded_amount',
      key: 'refunded_amount',
      render: (refunded_amount: { value: string; currency: string }) => (
        <Space>
          {refunded_amount?.value &&
            Number(refunded_amount?.value)?.toLocaleString('ru-RU', {
              style: 'currency',
              currency: refunded_amount?.currency || 'RUB',
            })}
        </Space>
      ),
    },
    {
      title: t('ACTIONS'),
      key: 'actions',
      render: (_: unknown, record: Payment) => (
        <Dropdown
          menu={{
            items: actionItems(record),
            onClick: (e) => onActionClick({ key: e.key as ACTION_MENU_ITEMS, record }),
          }}>
          <Space>
            {t('ACTIONS')}
            <DownOutlined />
          </Space>
        </Dropdown>
      ),
    },
  ];

  return { columns };
};
