import { useTranslation } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';
import {
  PAYMENT_STATUS,
  ChoppTextWithTooltip,
  Order,
  ChoppPaymentStatus,
  ChoppOrderStatus,
  ORDER_STATUS,
} from '@shared/index';
import { Tooltip, Dropdown, Space } from 'antd';
import dayjs from 'dayjs';
import { useGetActionItems } from './use-get-action-items';
import { ACTION_MENU_ITEMS } from '../enums';
import { ActionValue } from '../types';

type Args = {
  onActionClick: (info: ActionValue) => void;
};

export const useGetOrderTableColumns = ({ onActionClick }: Args) => {
  const { t } = useTranslation();
  const { actionItems } = useGetActionItems();

  const columns = [
    {
      title: t('CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => dayjs(text).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('AMOUNT'),
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (value: number) =>
        value?.toLocaleString('ru-RU', {
          style: 'currency',
          currency: 'RUB',
        }),
    },
    {
      title: t('ORDER_STATUS_TITLE'),
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (status: ORDER_STATUS) => <ChoppOrderStatus status={status} />,
    },
    {
      title: t('PAYMENT_STATUS_TITLE'),
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: PAYMENT_STATUS) => <ChoppPaymentStatus status={status} />,
    },
    {
      title: t('DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <Tooltip title={description}>
          <div>{description}</div>
        </Tooltip>
      ),
    },
    {
      title: (
        <ChoppTextWithTooltip
          title={t('TRANSACTION_ID')}
          tooltipText={t('TRANSACTION_ID_TOOLTIP')}
        />
      ),
      dataIndex: 'transactionId',
      key: 'transactionId',
      className: 'cursor-pointer',
      render: (text: string) => (
        <Tooltip title={text}>
          {/* TODO: передатать на tailwind css */}
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: t('ACTIONS'),
      key: 'actions',
      render: (_: any, record: Order) => (
        <Dropdown
          menu={{
            items: actionItems,
            onClick: (info) => onActionClick({ key: info.key as ACTION_MENU_ITEMS, record }),
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
