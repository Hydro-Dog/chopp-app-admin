import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse } from '@shared/types';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';
import { Pricing } from './types';

export const fetchPricing = createAsyncThunk<void, Pricing, { rejectValue: ErrorResponse }>(
  'pricing/fetchPricing',
  async (data, thunkAPI) => {
    try {
      await axiosPrivate.post('/pricing', data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  },
);
