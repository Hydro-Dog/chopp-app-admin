import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse, Order, PaginationResponse, FETCH_STATUS } from '@shared/index';
import { fetchOrders, updateOrderPaymentStatus } from './actions';

export type OrderState = {
  orders?: PaginationResponse<Order>;
  fetchOrdersStatus: FETCH_STATUS;
  fetchOrdersError: ErrorResponse | null;
  updateOrderPaymentStatusStatus: FETCH_STATUS;
  updateOrderPaymentStatusError: ErrorResponse | null;
};

const initialState: OrderState = {
  orders: undefined,
  fetchOrdersStatus: FETCH_STATUS.IDLE,
  fetchOrdersError: null,
  updateOrderPaymentStatusStatus: FETCH_STATUS.IDLE,
  updateOrderPaymentStatusError: null,
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
      })
      .addCase(updateOrderPaymentStatus.pending, (state) => {
        state.updateOrderPaymentStatusStatus = FETCH_STATUS.LOADING;
      })
      .addCase(updateOrderPaymentStatus.fulfilled, (state) => {
        state.updateOrderPaymentStatusStatus = FETCH_STATUS.SUCCESS;
      })
      .addCase(updateOrderPaymentStatus.rejected, (state, action) => {
        state.updateOrderPaymentStatusStatus = FETCH_STATUS.ERROR;
        state.updateOrderPaymentStatusError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
