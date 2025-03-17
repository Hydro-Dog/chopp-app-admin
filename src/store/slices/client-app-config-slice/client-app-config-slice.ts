import { createSlice } from '@reduxjs/toolkit';
import { FETCH_STATUS } from '@shared/index';
import { ErrorResponse, ClientAppConfig } from '@shared/types';
import { postClientAppConfig, fetchClientAppConfig } from './actions';

export type ClientAppConfigState = {
  clientAppConfigData?: ClientAppConfig;
  fetchClientAppConfigDataStatus: FETCH_STATUS;
  fetchClientAppConfigDataError?: ErrorResponse;
  postClientAppConfigStatus: FETCH_STATUS;
  postClientAppConfigDataError?: ErrorResponse;
};

const initialState: ClientAppConfigState = {
  clientAppConfigData: undefined,
  fetchClientAppConfigDataStatus: FETCH_STATUS.IDLE,
  fetchClientAppConfigDataError: undefined,
  postClientAppConfigStatus: FETCH_STATUS.IDLE,
  postClientAppConfigDataError: undefined,
};

export const clientAppConfigSlice = createSlice({
  name: 'clientAppConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientAppConfig.pending, (state) => {
        state.fetchClientAppConfigDataStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchClientAppConfig.fulfilled, (state, action) => {
        state.fetchClientAppConfigDataStatus = FETCH_STATUS.SUCCESS;
        state.clientAppConfigData = action.payload;
      })
      .addCase(fetchClientAppConfig.rejected, (state, action) => {
        state.fetchClientAppConfigDataStatus = FETCH_STATUS.ERROR;
        state.fetchClientAppConfigDataError = action.payload ?? {
          message: 'Unknown error',
        };
      })
      .addCase(postClientAppConfig.pending, (state) => {
        state.postClientAppConfigStatus = FETCH_STATUS.LOADING;
        state.postClientAppConfigDataError = undefined;
      })
      .addCase(postClientAppConfig.fulfilled, (state, action) => {
        state.postClientAppConfigStatus = FETCH_STATUS.SUCCESS;
        state.clientAppConfigData = action.payload;
      })
      .addCase(postClientAppConfig.rejected, (state, action) => {
        state.postClientAppConfigStatus = FETCH_STATUS.ERROR;
        state.postClientAppConfigDataError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
