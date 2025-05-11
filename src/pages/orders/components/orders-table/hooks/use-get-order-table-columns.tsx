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
  onOrderStatusClick: (record: Order) => void;
};

/**
 * Хук возвращает конфигурацию колонок для таблицы заказов.
 * Включает форматирование даты, суммы, статусов и действий с заказом.
 */
export const useGetOrderTableColumns = ({ onActionClick, onOrderStatusClick }: Args) => {
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
      render: (status: ORDER_STATUS, record: Order) => (
        <ChoppOrderStatus
          tooltipPlacement="left"
          onClick={() => onOrderStatusClick(record)}
          status={status}
        />
      ),
    },
    {
      title: t('PAYMENT_STATUS_TITLE'),
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: PAYMENT_STATUS) => (
        <ChoppPaymentStatus tooltipPlacement="right" status={status} />
      ),
    },
    {
      title: t('COMMENT'),
      dataIndex: 'comment',
      key: 'comment',
      render: (text: string) => (
        <Tooltip title={text}>
          <div>{text}</div>
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
        <ChoppTextWithTooltip showInfoIcon={false} copyable title={text} tooltipText={text} />
      ),
    },
    {
      title: t('ACTIONS'),
      key: 'actions',
      render: (_: any, record: Order) => (
        <Dropdown
          className="cursor-pointer"
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
