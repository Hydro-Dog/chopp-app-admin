/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WsMessage } from '@shared/types/ws-message';

export type WsState = {
  wsConnected: boolean;
  error: any;
}

const initialState: WsState = {
  wsConnected: false,
  error: null,
};

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    setWsConnected: (state, action: PayloadAction<boolean>) => {
      state.wsConnected = action.payload;
    },
    setWsError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    wsConnect: (state, action) => {},
    wsDisconnect: () => {},
    wsSend: (state, action: PayloadAction<WsMessage>) => {},
  },
});

export const { setWsConnected, setWsError, wsConnect, wsDisconnect, wsSend } =
  wsSlice.actions;
