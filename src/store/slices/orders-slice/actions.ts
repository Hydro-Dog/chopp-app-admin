import { createAsyncThunk } from '@reduxjs/toolkit';
import { createFetchPaginationListThunkAction } from '@shared/index';
import { ErrorResponse, Order, PaginationRequestQuery } from '@shared/types';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';
import { UpdateOrderDTO } from './types';

export const fetchOrders = createFetchPaginationListThunkAction<
  Order,
  PaginationRequestQuery,
  ErrorResponse
>({
  actionName: 'orders/fetchOrders',
  endpoint: '/orders',
});

export const updateOrderPaymentStatus = createAsyncThunk<
  Order, // Тип успешного ответа
  UpdateOrderDTO, // Тип параметров запроса
  { rejectValue: ErrorResponse } // Тип для ошибок
>('orders/updateOrderPaymentStatus', async (updateData, thunkAPI) => {
  try {
    const response = await axiosPrivate.post<Order>(
      '/orders/update-order-payment-status',
      updateData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});
