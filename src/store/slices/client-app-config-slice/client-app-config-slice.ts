import { createSlice } from '@reduxjs/toolkit';
import { FETCH_STATUS } from '@shared/index';
import { ErrorResponse, ClientAppConfig } from '@shared/types';
import { postClientAppConfig, fetchClientAppConfig } from './actions';

export type ClientAppConfigState = {
  pricingData?: ClientAppConfig;
  fetchPricingDataStatus: FETCH_STATUS;
  fetchPricingDataError?: ErrorResponse;
  postPricingDataStatus: FETCH_STATUS;
  postPricingDataError?: ErrorResponse;
};

const initialState: ClientAppConfigState = {
  pricingData: undefined,
  fetchPricingDataStatus: FETCH_STATUS.IDLE,
  fetchPricingDataError: undefined,
  postPricingDataStatus: FETCH_STATUS.IDLE,
  postPricingDataError: undefined,
};

export const clientAppConfigSlice = createSlice({
  name: 'clientAppConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientAppConfig.pending, (state) => {
        state.fetchPricingDataStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchClientAppConfig.fulfilled, (state, action) => {
        state.fetchPricingDataStatus = FETCH_STATUS.SUCCESS;
        state.pricingData = action.payload;
      })
      .addCase(fetchClientAppConfig.rejected, (state, action) => {
        state.fetchPricingDataStatus = FETCH_STATUS.ERROR;
        state.fetchPricingDataError = action.payload ?? {
          message: 'Unknown error',
        };
      })
      .addCase(postClientAppConfig.pending, (state) => {
        state.postPricingDataStatus = FETCH_STATUS.LOADING;
        state.postPricingDataError = undefined;
      })
      .addCase(postClientAppConfig.fulfilled, (state, action) => {
        state.postPricingDataStatus = FETCH_STATUS.SUCCESS;
        state.pricingData = action.payload;
      })
      .addCase(postClientAppConfig.rejected, (state, action) => {
        state.postPricingDataStatus = FETCH_STATUS.ERROR;
        state.postPricingDataError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
