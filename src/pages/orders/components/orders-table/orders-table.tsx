import { useState } from 'react';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { ErrorResponse, Order, PaginationQuery, PaginationResponse } from '@shared/types';
import { Table } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { ChangeOrderStatusModal } from './components';
import { ACTION_MENU_ITEMS } from './enums';
import { useGetOrderTableColumns } from './hooks';
import { ActionValue } from './types';
import { ChoppInfoModal } from '@shared/index';

type FetchDataFunction = (
  params: PaginationQuery,
) => AsyncThunkAction<PaginationResponse<Order>, PaginationQuery, { rejectValue: ErrorResponse }>;

type Props = {
  fetchData: FetchDataFunction;
  data?: PaginationResponse<Order>;
};

export const OrdersTable = ({ data }: Props) => {
  const { value: isStatusModalOpened, setTrue: openStatusModal, setFalse: closeStatusModal } = useBoolean();
  const { value: isInfoModalOpened, setTrue: openInfoModal, setFalse: closeInfoModal } = useBoolean();
  const [clickedOrder, setClickedOrder] = useState<Order>();

  const map: Record<ACTION_MENU_ITEMS, (item: ActionValue) => void> = {
    [ACTION_MENU_ITEMS.INFO]: ({ record }) => {
      setClickedOrder(record);
      openInfoModal()
    },
    [ACTION_MENU_ITEMS.CHANGE_ORDER_STATUS]: ({ record }) => {
      setClickedOrder(record);
      openStatusModal();
    },
  };

  const onActionClick = (action: ActionValue) => {
    map[action.key](action);
  };
  const { columns } = useGetOrderTableColumns({ onActionClick });

  return (
    <>
      <Table className="!p-0" size="small" columns={columns} dataSource={data?.items} rowKey="id" />
      <ChangeOrderStatusModal
        open={isStatusModalOpened}
        onClose={closeStatusModal}
        order={clickedOrder}
      />
      <ChoppInfoModal open={isInfoModalOpened} onClose={closeInfoModal} value={clickedOrder} />
    </>
  );
};
