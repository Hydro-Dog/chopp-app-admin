import { useState } from 'react';
import { ORDER_STATUS } from '@shared/enum';
import { Order } from '@shared/types';
import { Table } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { ChangeOrderStatusModal, OrderDetailsModal } from './components';
import { ACTION_MENU_ITEMS } from './enums';
import { useGetOrderTableColumns } from './hooks';
import { ActionValue } from './types';

type Props = {
  data: Order[];
  onStatusChange: ({
    orderStatus,
    transactionId,
  }: {
    orderStatus: ORDER_STATUS;
    transactionId: string;
  }) => void;
};

export const OrdersTable = ({ data, onStatusChange }: Props) => {
  const {
    value: isStatusModalOpened,
    setTrue: openStatusModal,
    setFalse: closeStatusModal,
  } = useBoolean();
  const {
    value: isInfoModalOpened,
    setTrue: openInfoModal,
    setFalse: closeInfoModal,
  } = useBoolean();
  const [clickedOrder, setClickedOrder] = useState<Order>();

  const actionsMap: Record<ACTION_MENU_ITEMS, (item: ActionValue) => void> = {
    [ACTION_MENU_ITEMS.INFO]: ({ record }) => {
      setClickedOrder(record);
      openInfoModal();
    },
    [ACTION_MENU_ITEMS.CHANGE_ORDER_STATUS]: ({ record }) => {
      setClickedOrder(record);
      openStatusModal();
    },
  };

  const onActionClick = (action: ActionValue) => {
    actionsMap[action.key](action);
  };

  const onOrderStatusClick = (order: Order) => {
    setClickedOrder(order);
    openStatusModal();
  };

  const { columns } = useGetOrderTableColumns({ onActionClick, onOrderStatusClick });

  return (
    <>
      <Table
        className="!p-0"
        size="small"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
      />

      <ChangeOrderStatusModal
        open={isStatusModalOpened}
        onSubmit={onStatusChange}
        onClose={closeStatusModal}
        order={clickedOrder}
      />

      <OrderDetailsModal open={isInfoModalOpened} onOk={closeInfoModal} order={clickedOrder} />
    </>
  );
};
