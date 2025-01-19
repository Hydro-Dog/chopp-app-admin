import { createSlice } from '@reduxjs/toolkit';
import { fetchPricing, fetchPricingData } from './actions';
import { FETCH_STATUS } from '../../types/fetch-status';

export type PricingData = {
  averageDeliveryCost: number;
  freeDeliveryIncluded: boolean;
  freeDeliveryThreshold: number;
};

export type PricingState = {
  data: PricingData | null;
  fetchStatus: FETCH_STATUS;
  fetchError: { message: string } | undefined;
  submitStatus: FETCH_STATUS;
  submitError: { message: string } | undefined;
};
const initialState: PricingState = {
  data: null,
  fetchStatus: FETCH_STATUS.IDLE,
  fetchError: undefined,
  submitStatus: FETCH_STATUS.IDLE,
  submitError: undefined,
};
export const pricingSlice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {
    resetSubmitStatus(state) {
      state.submitStatus = FETCH_STATUS.IDLE;
      state.submitError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricingData.pending, (state) => {
        state.fetchStatus = FETCH_STATUS.LOADING;
        state.fetchError = undefined;
      })
      .addCase(fetchPricingData.fulfilled, (state, action) => {
        state.fetchStatus = FETCH_STATUS.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchPricingData.rejected, (state, action) => {
        state.fetchStatus = FETCH_STATUS.ERROR;
        state.fetchError = (action.payload as { message: string } | undefined) ?? {
          message: 'Unknown error',
        };
      })
      .addCase(fetchPricing.pending, (state) => {
        state.submitStatus = FETCH_STATUS.LOADING;
        state.submitError = undefined;
      })
      .addCase(fetchPricing.fulfilled, (state, action) => {
        state.submitStatus = FETCH_STATUS.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchPricing.rejected, (state, action) => {
        state.submitStatus = FETCH_STATUS.ERROR;
        state.submitError = (action.payload as { message: string } | undefined) ?? {
          message: 'Unknown error',
        };
      });
  },
});
