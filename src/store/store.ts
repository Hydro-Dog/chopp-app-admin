import { configureStore } from '@reduxjs/toolkit';
import { wsMiddleware } from './middleware/ws-middleware';
import {
  chatSlice,
  ChatsState,
  userSlice,
  UserState,
  wsSlice,
  WsState,
  productSlice,
  ProductsState,
  ordersSlice,
  OrderState,
  PaymentsState,
  paymentsSlice,
} from './slices/';
import { productCategorySlice, ProductCategoryState } from './slices/product-category-slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ws: wsSlice.reducer,
    chatsRepository: chatSlice.reducer,
    productCategory: productCategorySlice.reducer,
    products: productSlice.reducer,
    orders: ordersSlice.reducer,
    payments: paymentsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsMiddleware),
});

export type RootState = {
  user: UserState;
  ws: WsState;
  chatsRepository: ChatsState;
  productCategory: ProductCategoryState;
  products: ProductsState;
  orders: OrderState;
  payments: PaymentsState;
};

export type AppDispatch = typeof store.dispatch;
