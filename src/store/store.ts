import { configureStore } from '@reduxjs/toolkit';
import { wsMiddleware } from './middleware/ws-middleware';
import {
  chatSlice,
  ChatState,
  userSlice,
  UserState,
  wsSlice,
  WsState,
  productSlice,
  ProductState,
} from './slices/';
import { productCategorySlice, ProductCategoryState } from './slices/product-category-slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ws: wsSlice.reducer,
    chat: chatSlice.reducer,
    productCategory: productCategorySlice.reducer,
    product: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsMiddleware),
});

export type RootState = {
  user: UserState;
  ws: WsState;
  chat: ChatState;
  productCategory: ProductCategoryState;
  product: ProductState;
};

export type AppDispatch = typeof store.dispatch;
