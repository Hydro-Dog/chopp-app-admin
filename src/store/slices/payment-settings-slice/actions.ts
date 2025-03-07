import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, PaymentSettings } from '@shared/types';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';

export const fetchPaymentSettings = createAsyncThunk<
  PaymentSettings,
  void,
  { rejectValue: ErrorResponse }
>('paymentSettings/fetchPaymentSettings', async (_, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<PaymentSettings>('pricing/settings');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});

export const postPaymentSettings = createAsyncThunk<
  PaymentSettings,
  PaymentSettings,
  {
    rejectValue: ErrorResponse;
  }
>('paymentSettings/postPaymentSettings', async (data, thunkAPI) => {
  try {
    const response = await axiosPrivate.post<PaymentSettings>('pricing/settings', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});
