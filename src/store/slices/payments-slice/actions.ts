import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse } from '@shared/index';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';

type FetchPaymentsParams = {
  limit?: number;
  cursor?: string;
  created_at_gte?: string;
  created_at_gt?: string;
  created_at_lte?: string;
  created_at_lt?: string;
  payment_id?: string;
  status?: string;
  pageNumber?: number;
};

export const fetchPayments = createAsyncThunk<
  any, // TODO: убрть any
  FetchPaymentsParams, // Тип параметров запроса
  { rejectValue: ErrorResponse } // Тип для ошибок
>(
  'payments/fetchPayments',
  async (
    {
      limit,
      cursor,
      created_at_gte,
      created_at_gt,
      created_at_lte,
      created_at_lt,
      payment_id,
      status,
      pageNumber,
    },
    thunkAPI,
  ) => {
    try {
      // Формируем объект параметров, добавляя только переданные значения
      const params: Record<string, string> = {};

      if (limit) params.limit = String(limit);
      if (cursor) params.cursor = cursor;
      if (created_at_gte) params.created_at_gte = created_at_gte;
      if (created_at_gt) params.created_at_gt = created_at_gt;
      if (created_at_lte) params.created_at_lte = created_at_lte;
      if (created_at_lt) params.created_at_lt = created_at_lt;
      if (payment_id) params.payment_id = payment_id;
      if (status) params.status = status;
      if (pageNumber) params.pageNumber = String(pageNumber);

      // TODO: убрать any
      const response = await axiosPrivate.get<any>('/payments', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  },
);

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
