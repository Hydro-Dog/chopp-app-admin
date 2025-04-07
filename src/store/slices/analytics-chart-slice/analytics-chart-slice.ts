import { createSlice } from '@reduxjs/toolkit';
import { FETCH_STATUS, ErrorResponse } from '@shared/index';
import { fetchAnalyticsData } from './actions';
import { GeneralAnalyticsData } from '@shared/index';

export type AnalyticsState = {
  analyticsData?: GeneralAnalyticsData;
  fetchAnalyticsDataStatus: FETCH_STATUS;
  fetchAnalyticsDataError?: ErrorResponse;
};

const initialState: AnalyticsState = {
  analyticsData: undefined,
  fetchAnalyticsDataStatus: FETCH_STATUS.IDLE,
  fetchAnalyticsDataError: undefined,
};

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.fetchAnalyticsDataStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.fetchAnalyticsDataStatus = FETCH_STATUS.SUCCESS;
        state.analyticsData = action.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.fetchAnalyticsDataStatus = FETCH_STATUS.ERROR;
        state.fetchAnalyticsDataError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
