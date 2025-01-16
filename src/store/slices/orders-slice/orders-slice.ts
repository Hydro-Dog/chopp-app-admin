import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse, Order, PaginationResponse } from '@shared/index';
import { fetchOrders } from './actions';
import { FETCH_STATUS } from '../../types/fetch-status';

export type OrderState = {
  orders?: PaginationResponse<Order>;
  fetchOrdersStatus: FETCH_STATUS;
  fetchOrdersError: ErrorResponse | null;
};

const initialState: OrderState = {
  orders: undefined,
  fetchOrdersStatus: FETCH_STATUS.IDLE,
  fetchOrdersError: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.fetchOrdersStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.fetchOrdersStatus = FETCH_STATUS.SUCCESS;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.fetchOrdersStatus = FETCH_STATUS.ERROR;
        state.fetchOrdersError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
