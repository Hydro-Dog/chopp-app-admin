import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, PricingData } from '@shared/types';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';

export const fetchPricingData = createAsyncThunk<PricingData, void, { rejectValue: ErrorResponse }>(
  'pricing/fetchPricingData',
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get<PricingData>('/pricing');
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

export const postPricingData = createAsyncThunk<
  PricingData,
  PricingData,
  { rejectValue: ErrorResponse }
>('pricing/postPricingData', async (data, thunkAPI) => {
  try {
    const response = await axiosPrivate.post<PricingData>('/pricing', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});
