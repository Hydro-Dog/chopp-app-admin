import { createSlice } from '@reduxjs/toolkit';
import { postPricing, fetchPricingData } from './actions';
import { PricingData } from './types';
import { FETCH_STATUS } from '../../types/fetch-status';

export type PricingState = {
  pricingData: PricingData | null;
  fetchStatus: FETCH_STATUS;
  fetchError: { message: string } | undefined;
  submitStatus: FETCH_STATUS;
  submitError: { message: string } | undefined;
};
const initialState: PricingState = {
  pricingData: null,
  fetchStatus: FETCH_STATUS.IDLE,
  fetchError: undefined,
  submitStatus: FETCH_STATUS.IDLE,
  submitError: undefined,
};
export const pricingSlice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricingData.pending, (state) => {
        state.fetchStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchPricingData.fulfilled, (state, action) => {
        state.fetchStatus = FETCH_STATUS.SUCCESS;
        state.pricingData = action.payload;
      })
      .addCase(fetchPricingData.rejected, (state, action) => {
        state.fetchStatus = FETCH_STATUS.ERROR;
        state.fetchError = (action.payload as { message: string } | undefined) ?? {
          message: 'Unknown error',
        };
      })
      .addCase(postPricing.pending, (state) => {
        state.submitStatus = FETCH_STATUS.LOADING;
        state.submitError = undefined;
      })
      .addCase(postPricing.fulfilled, (state, action) => {
        state.submitStatus = FETCH_STATUS.SUCCESS;
        state.pricingData = action.payload;
      })
      .addCase(postPricing.rejected, (state, action) => {
        state.submitStatus = FETCH_STATUS.ERROR;
        state.submitError = (action.payload as { message: string } | undefined) ?? {
          message: 'Unknown error',
        };
      });
  },
});
