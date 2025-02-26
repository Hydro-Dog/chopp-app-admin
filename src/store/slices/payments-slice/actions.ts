import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse } from '@shared/index';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';

export type FetchPaymentsParams = {
  limit?: number;
  cursor?: string;
  ['created_at.gte']?: string;
  created_at_gt?: string;
  ['created_at.lte']?: string;
  created_at_lt?: string;
  payment_id?: string;
  status?: string;
  pageNumber?: number;
};

export const fetchPayments = createAsyncThunk<
  any, // TODO: убрать any
  FetchPaymentsParams, // Тип параметров запроса
  { rejectValue: ErrorResponse } // Тип для ошибок
>('payments/fetchPayments', async (fetchData, thunkAPI) => {
  try {
    const { limit, cursor, created_at_gt, created_at_lt, payment_id, status, pageNumber } =
      fetchData;

    const params: Record<string, string> = {};

    if (limit) params.limit = String(limit);
    if (cursor) params.cursor = cursor;
    if (fetchData['created_at.gte']) params['created_at.gte'] = fetchData['created_at.gte'];
    if (created_at_gt) params.created_at_gt = created_at_gt;
    if (fetchData['created_at.lte']) params['created_at.lte'] = fetchData['created_at.lte'];
    if (created_at_lt) params.created_at_lt = created_at_lt;
    if (payment_id) params.payment_id = payment_id;
    if (status) params.status = status;
    if (pageNumber) params.pageNumber = String(pageNumber);

    const response = await axiosPrivate.get<any>('/payments', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});

export const refundPayment = createAsyncThunk<
  {
    id: string;
    status: string;
    amount: string;
    currency: string;
    createdAt: string;
  },
  { payment_id: string; amount: { value: string; currency: string } },
  { rejectValue: ErrorResponse }
>('/refundPayment', async (chatData, thunkAPI) => {
  try {
    const response = await axiosPrivate.post(`payments/refund`, chatData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});
