import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, Order, SearchRequestParams, SearchResponse } from '@shared/types';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';

export const fetchOrders = createAsyncThunk<
  SearchResponse<Order>,
  { categoryId: string } & SearchRequestParams,
  { rejectValue: ErrorResponse }
>('orders/fetchOrders', async ({ pageNumber, limit, search, sort, order }, thunkAPI) => {
  try {
    const params = new URLSearchParams({
      pageNumber: String(pageNumber || 1),
      limit: String(limit || 10),
      search: search || '',
      // sort: sort || '',
      sort: 'createdAt',
      order: order || 'asc',
    });

    const response = await axiosPrivate.get<SearchResponse<Order>>('/orders', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});
