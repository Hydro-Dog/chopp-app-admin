import { useTranslation } from 'react-i18next';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ToolOutlined,
  ShoppingOutlined,
  CarOutlined,
  DeliveredProcedureOutlined,
} from '@ant-design/icons';
import { ChoppOrderStatus } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { Space, MenuProps } from 'antd';

/**
 * Хук, возвращающий сгруппированный список статусов заказа
 * для отображения в выпадающем меню. Каждому статусу сопоставлен иконка и компонент отображения.
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
          label: (
            <Space>
              <ClockCircleOutlined />
              <ChoppOrderStatus tooltipPlacement="right" status={ORDER_STATUS.AWAITING_PAYMENT} />
            </Space>
          ),
        },
        {
          key: ORDER_STATUS.PAYMENT_SUCCEEDED,
          label: (
            <Space>
              <CheckCircleOutlined />
              <ChoppOrderStatus tooltipPlacement="right" status={ORDER_STATUS.PAYMENT_SUCCEEDED} />
            </Space>
          ),
        },
        {
          key: ORDER_STATUS.PAYMENT_CANCELED,
          label: (
            <Space>
              <CloseCircleOutlined />
              <ChoppOrderStatus tooltipPlacement="right" status={ORDER_STATUS.PAYMENT_CANCELED} />
            </Space>
          ),
        },
      ],
    },
    {
      type: 'group',
      label: `📦 ${t('ORDER_STATUS_GROUP.DELIVERY')}`,
      children: [
        {
          key: ORDER_STATUS.PENDING,
          label: (
            <Space>
              <ToolOutlined />
              <ChoppOrderStatus tooltipPlacement="right" status={ORDER_STATUS.PENDING} />
            </Space>
          ),
        },
        {
          key: ORDER_STATUS.IN_PROGRESS,
          label: (
            <Space>
              <ShoppingOutlined />
              <ChoppOrderStatus tooltipPlacement="right" status={ORDER_STATUS.IN_PROGRESS} />
            </Space>
          ),
        },
        {
          key: ORDER_STATUS.IN_DELIVERY_PROCESS,
          label: (
            <Space>
              <CarOutlined />
              <ChoppOrderStatus
                tooltipPlacement="right"
                status={ORDER_STATUS.IN_DELIVERY_PROCESS}
              />
            </Space>
          ),
        },
        {
          key: ORDER_STATUS.DELIVERED,
          label: (
            <Space>
              <DeliveredProcedureOutlined />
              <ChoppOrderStatus tooltipPlacement="right" status={ORDER_STATUS.DELIVERED} />
            </Space>
          ),
        },
      ],
    },
  ];
};
