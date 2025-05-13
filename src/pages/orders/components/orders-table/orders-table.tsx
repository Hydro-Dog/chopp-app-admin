import { useState } from 'react';
import { ORDER_STATUS } from '@shared/enum';
import { Order } from '@shared/types';
import { Table } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { ChangeOrderStatusModal, OrderDetailsModal, RowProductCard } from './components';
import { ACTION_MENU_ITEMS } from './enums';
import { useGetOrderTableColumns } from './hooks';
import { ActionValue } from './types';
import { sortProductImages } from '@shared/utils/sort-product-images';

type Props = {
  data: Order[];
  onStatusChange: (params: { orderStatus: ORDER_STATUS; transactionId: string }) => void;
};

/**
 * Таблица заказов с экшенами:
 * - просмотр деталей заказа,
 * - изменение статуса.
 *
 * Модалки открываются при выборе действия из таблицы.
 */
export const OrdersTable = ({ data, onStatusChange }: Props) => {
  const {
    value: isStatusModalOpen,
    setTrue: openStatusModal,
    setFalse: closeStatusModal,
  } = useBoolean();

  const { value: isInfoModalOpen, setTrue: openInfoModal, setFalse: closeInfoModal } = useBoolean();

  const [selectedOrder, setSelectedOrder] = useState<Order>();

  const handleActionClick = (action: ActionValue) => {
    const { key, record } = action;

    setSelectedOrder(record);

    if (key === ACTION_MENU_ITEMS.INFO) {
      openInfoModal();
    }

    if (key === ACTION_MENU_ITEMS.CHANGE_ORDER_STATUS) {
      openStatusModal();
    }
  };

  const handleOrderStatusClick = (order: Order) => {
    setSelectedOrder(order);
    openStatusModal();
  };

  const { columns } = useGetOrderTableColumns({
    onActionClick: handleActionClick,
    onOrderStatusClick: handleOrderStatusClick,
  });

  return (
    <>
      <Table
        className="!p-0"
        size="small"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        expandable={{
          expandedRowRender: (record: Order) => <RowProductCard record={record} />,
        }}
      />

      <ChangeOrderStatusModal
        open={isStatusModalOpen}
        onSubmit={onStatusChange}
        onClose={closeStatusModal}
        order={selectedOrder}
      />

      <OrderDetailsModal open={isInfoModalOpen} onOk={closeInfoModal} order={selectedOrder} />
    </>
  );
};
