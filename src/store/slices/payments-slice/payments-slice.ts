import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse } from '@shared/index';
import { FETCH_STATUS } from '../../types/fetch-status';
import { fetchPayments, refundPayment } from './actions';

export type PaymentsState = {
  payments?: any;
  fetchPaymentsStatus: FETCH_STATUS;
  //TODO: тип смотри в axios запросе в экшене
  fetchPaymentsError: ErrorResponse | null;
  refundPaymentResponse: any;
  refundPaymentStatus: FETCH_STATUS;
  refundPaymentError: ErrorResponse | null;
};

const initialState: PaymentsState = {
  payments: undefined,
  fetchPaymentsStatus: FETCH_STATUS.IDLE,
  fetchPaymentsError: null,
  refundPaymentResponse: undefined,
  refundPaymentStatus: FETCH_STATUS.IDLE,
  refundPaymentError: null,
};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.fetchPaymentsStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.fetchPaymentsStatus = FETCH_STATUS.SUCCESS;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.fetchPaymentsStatus = FETCH_STATUS.ERROR;
        state.fetchPaymentsError = action.payload ?? {
          message: 'Unknown error',
        };
      })
      .addCase(refundPayment.pending, (state) => {
        state.refundPaymentStatus = FETCH_STATUS.LOADING;
      })
      .addCase(refundPayment.fulfilled, (state, action) => {
        state.refundPaymentStatus = FETCH_STATUS.SUCCESS;
        state.refundPaymentResponse = action.payload;
      })
      .addCase(refundPayment.rejected, (state, action) => {
        state.refundPaymentStatus = FETCH_STATUS.ERROR;
        state.refundPaymentError = action.payload ?? {
          message: 'Unknown error',
        };
      })
  },
});
