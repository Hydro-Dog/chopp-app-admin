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
  ProductsState,
  ordersSlice,
  OrderState,
} from './slices/';
import { productCategorySlice, ProductCategoryState } from './slices/product-category-slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ws: wsSlice.reducer,
    chat: chatSlice.reducer,
    productCategory: productCategorySlice.reducer,
    products: productSlice.reducer,
    orders: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsMiddleware),
});

export type RootState = {
  user: UserState;
  ws: WsState;
  chat: ChatState;
  productCategory: ProductCategoryState;
  products: ProductsState;
  orders: OrderState;
};

export type AppDispatch = typeof store.dispatch;
