/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WsMessage } from '@shared/types/ws-message';

export type WsState<T = any> = {
  wsConnected: boolean;
  messages: WsMessage<T>[];
  error: any;
}

const initialState: WsState = {
  wsConnected: false,
  messages: [],
  error: null,
};

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    setWsConnected: (state, action: PayloadAction<boolean>) => {
      state.wsConnected = action.payload;
    },
    pushWsMessage: (state, action: PayloadAction<any>) => {
      state.messages.push(action.payload);
    },
    setWsError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    wsConnect: ({ url: string }) => {},
    wsDisconnect: () => {},
    wsSend: (state, action: PayloadAction<WsMessage>) => {},
  },
});

export const { setWsConnected, pushWsMessage, setWsError, wsConnect, wsDisconnect, wsSend } =
  wsSlice.actions;
