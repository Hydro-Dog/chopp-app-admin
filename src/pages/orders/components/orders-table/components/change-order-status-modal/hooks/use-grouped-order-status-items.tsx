import { useTranslation } from 'react-i18next';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ToolOutlined,
  ShoppingOutlined,
  CarOutlined,
  DeliveredProcedureOutlined,
  ReloadOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { ChoppOrderStatus } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { Space, Typography, MenuProps } from 'antd';

const { Text } = Typography;

/**
 * Хук, возвращающий сгруппированный список статусов заказа
 * для отображения в выпадающем меню. Каждому статусу сопоставлены иконка и компонент.
 * Группы: платёж (disabled), обработка, доставка, завершение.
 */
export const useGroupedOrderStatusItems = (): MenuProps['items'] => {
  const { t } = useTranslation();

  return [
    {
      type: 'group',
      label: `💳 ${t('ORDER_STATUS_GROUP.PAYMENT')}`,
      children: [
        {
          key: ORDER_STATUS.AWAITING_PAYMENT,
          disabled: true,
          label: <ChoppOrderStatus status={ORDER_STATUS.AWAITING_PAYMENT} />,
        },
        {
          key: ORDER_STATUS.PAYMENT_SUCCEEDED,
          disabled: true,
          label: <ChoppOrderStatus status={ORDER_STATUS.PAYMENT_SUCCEEDED} />,
        },
        {
          key: ORDER_STATUS.PAYMENT_CANCELED,
          disabled: true,
          label: <ChoppOrderStatus status={ORDER_STATUS.PAYMENT_CANCELED} />,
        },
        {
          type: 'divider',
        },
        {
          key: 'info-payment-managed',
          disabled: true,
          label: (
            <Text type="secondary">
              <LockOutlined style={{ marginRight: 4 }} />
              {t('ORDER_STATUS_GROUP.MANAGED_BY_YOOKASSA')}
            </Text>
          ),
        },
      ],
    },
    {
      type: 'group',
      label: `🛠️ ${t('ORDER_STATUS_GROUP.PROCESSING')}`,
      children: [
        {
          key: ORDER_STATUS.PENDING,
          label: <ChoppOrderStatus status={ORDER_STATUS.PENDING} />,
        },
        {
          key: ORDER_STATUS.IN_PROGRESS,
          label: <ChoppOrderStatus status={ORDER_STATUS.IN_PROGRESS} />,
        },
      ],
    },
    {
      type: 'group',
      label: `🚚 ${t('ORDER_STATUS_GROUP.DELIVERY')}`,
      children: [
        {
          key: ORDER_STATUS.IN_DELIVERY_PROCESS,
          label: <ChoppOrderStatus status={ORDER_STATUS.IN_DELIVERY_PROCESS} />,
        },
      ],
    },
    {
      type: 'group',
      label: `🏁 ${t('ORDER_STATUS_GROUP.FINAL')}`,
      children: [
        {
          key: ORDER_STATUS.DELIVERED,
          label: <ChoppOrderStatus status={ORDER_STATUS.DELIVERED} />,
        },
        {
          key: ORDER_STATUS.REFUNDED,
          label: <ChoppOrderStatus status={ORDER_STATUS.REFUNDED} tooltipPlacement="right" />,
        },
        {
          type: 'divider',
        },
        {
          key: 'info-payment-managed',
          disabled: true,
          label: (
            <Text type="secondary">
              <LockOutlined style={{ marginRight: 4 }} />
              {t('ORDER_STATUS_GROUP.FINAL_STATUSES_MESSAGE')}
            </Text>
          ),
        },
      ],
    },
  ];
};
