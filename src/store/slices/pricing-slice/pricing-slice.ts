import { createSlice } from '@reduxjs/toolkit';
import { FETCH_STATUS } from '@shared/index';
import { ErrorResponse, PricingData } from '@shared/types';
import { postPricingData, fetchPricingData } from './actions';

export type PricingState = {
  pricingData?: PricingData;
  fetchPricingDataStatus: FETCH_STATUS;
  fetchPricingDataError?: ErrorResponse;
  postPricingDataStatus: FETCH_STATUS;
  postPricingDataError?: ErrorResponse;
};

const initialState: PricingState = {
  pricingData: undefined,
  fetchPricingDataStatus: FETCH_STATUS.IDLE,
  fetchPricingDataError: undefined,
  postPricingDataStatus: FETCH_STATUS.IDLE,
  postPricingDataError: undefined,
};

export const pricingSlice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricingData.pending, (state) => {
        state.fetchPricingDataStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchPricingData.fulfilled, (state, action) => {
        state.fetchPricingDataStatus = FETCH_STATUS.SUCCESS;
        state.pricingData = action.payload;
      })
      .addCase(fetchPricingData.rejected, (state, action) => {
        state.fetchPricingDataStatus = FETCH_STATUS.ERROR;
        state.fetchPricingDataError = action.payload ?? {
          message: 'Unknown error',
        };
      })
      .addCase(postPricingData.pending, (state) => {
        state.postPricingDataStatus = FETCH_STATUS.LOADING;
        state.postPricingDataError = undefined;
      })
      .addCase(postPricingData.fulfilled, (state, action) => {
        state.postPricingDataStatus = FETCH_STATUS.SUCCESS;
        state.pricingData = action.payload;
      })
      .addCase(postPricingData.rejected, (state, action) => {
        state.postPricingDataStatus = FETCH_STATUS.ERROR;
        state.postPricingDataError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
