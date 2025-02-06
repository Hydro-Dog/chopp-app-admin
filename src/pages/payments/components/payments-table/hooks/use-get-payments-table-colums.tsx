import { useTranslation } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';
import { PAYMENT_STATUS_MAP, PAYMENT_STATUS } from '@shared/index';
import { Payment } from '@shared/types/payment';
import { Tooltip, Tag, Dropdown, Space } from 'antd';
import { useGetActionItems } from './use-get-action-items';
import { ACTION_MENU_ITEMS } from '../enums';
import { ActionValue } from '../types';

type Args = {
  onActionClick: (info: ActionValue) => void;
};

export const useGetPaymentsTableColumns = ({ onActionClick }: Args) => {
  const { t } = useTranslation();
  const { actionItems } = useGetActionItems();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('PAYMENT_STATUS_TITLE'),
      dataIndex: 'status',
      key: 'status',
      render: (status: PAYMENT_STATUS) => (
        <Tooltip title={t(PAYMENT_STATUS_MAP[status].tooltip)}>
          <Tag color={PAYMENT_STATUS_MAP[status].color}>{t(PAYMENT_STATUS_MAP[status].title)}</Tag>
        </Tooltip>
      ),
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
