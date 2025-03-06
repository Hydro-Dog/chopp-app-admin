import { createSlice } from '@reduxjs/toolkit';
import { FETCH_STATUS } from '@shared/index';
import { ErrorResponse, PaymentSettings } from '@shared/types';
import { postPaymentSettings, fetchPaymentSettings } from './actions';

export type PaymentSettingsState = {
  paymentSettings?: PaymentSettings;
  fetchPaymentSettingsStatus: FETCH_STATUS;
  fetchPaymentSettingsError?: ErrorResponse;
  postPaymentSettingsStatus: FETCH_STATUS;
  postPaymentSettingsError?: ErrorResponse;
};

const initialState: PaymentSettingsState = {
  paymentSettings: undefined,
  fetchPaymentSettingsStatus: FETCH_STATUS.IDLE,
  fetchPaymentSettingsError: undefined,
  postPaymentSettingsStatus: FETCH_STATUS.IDLE,
  postPaymentSettingsError: undefined,
};


export const paymentSettingsSlice = createSlice({
    name: 'paymentSettings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPaymentSettings.pending, (state) => {
          state.fetchPaymentSettingsStatus = FETCH_STATUS.LOADING;
        })
        .addCase(fetchPaymentSettings.fulfilled, (state, action) => {
          state.fetchPaymentSettingsStatus = FETCH_STATUS.SUCCESS;
          state.paymentSettings = action.payload;
        })
        .addCase(fetchPaymentSettings.rejected, (state, action) => {
          state.fetchPaymentSettingsStatus = FETCH_STATUS.ERROR;
          state.fetchPaymentSettingsError = action.payload ?? {
            message: 'Unknown error',
          };
        })
        .addCase(postPaymentSettings.pending, (state) => {
          state.postPaymentSettingsStatus = FETCH_STATUS.LOADING;
          state.postPaymentSettingsError = undefined;
        })
        .addCase(postPaymentSettings.fulfilled, (state, action) => {
          state.postPaymentSettingsStatus = FETCH_STATUS.SUCCESS;
          state.paymentSettings = action.payload;
        })
        .addCase(postPaymentSettings.rejected, (state, action) => {
          state.postPaymentSettingsStatus = FETCH_STATUS.ERROR;
          state.postPaymentSettingsError = action.payload ?? {
            message: 'Unknown error',
          };
        });
    },
  });
  