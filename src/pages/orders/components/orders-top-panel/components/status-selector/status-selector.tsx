import { useTranslation } from 'react-i18next';
import { useOrdersContext } from '@pages/orders/context';
import { ChoppOrderStatus } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { Select, SelectProps } from 'antd';
import { useRefetchTableOrders } from '../../../../hooks';

/**
 * Компонент мультиселекта для выбора статусов заказов.
 * Изменение статуса обновляет контекст и вызывает фильтрацию таблицы.
 */
export const StatusSelector = () => {
  const { t } = useTranslation();
  const { status, setStatus } = useOrdersContext();
  const refetchOrders = useRefetchTableOrders();

  const options = Object.values(ORDER_STATUS).map((status) => ({
    value: status,
    label: <ChoppOrderStatus status={status} />,
  }));

  const handleStatusChange = (selectedStatuses: string[]) => {
    setStatus(selectedStatuses);
    refetchOrders({ orderStatusParam: selectedStatuses });
  };

  const selectProps: SelectProps = {
    mode: 'multiple',
    maxTagCount: 'responsive',
    value: status,
    onChange: handleStatusChange,
    options,
    showSearch: false,
    className: 'w-full',
    placeholder: t('ORDERS_PAGE.CHOSEN_STATUS'),
  };

  return <Select {...selectProps} />;
};
