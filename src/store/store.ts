import { configureStore } from '@reduxjs/toolkit';
import { wsMiddleware } from './middleware/ws-middleware';
import { chatSlice, ChatState, userSlice, UserState, wsSlice, WsState } from './slices/';
import { goodsSlice, GoodsState } from './slices/goods-slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ws: wsSlice.reducer,
    chat: chatSlice.reducer,
    goods: goodsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsMiddleware),
});

export type RootState = {
  user: UserState;
  ws: WsState;
  chat: ChatState;
  goods: GoodsState;
};

export type AppDispatch = typeof store.dispatch;
