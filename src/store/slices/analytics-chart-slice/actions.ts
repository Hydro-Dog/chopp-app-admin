import { createAsyncThunk } from '@reduxjs/toolkit';
import { GeneralAnalyticsData } from '@shared/types';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';
import { ErrorResponse } from '@shared/types';

export type FetchAnalyticsOrdersParams = {
  productsId?: number[];
  endDate?: string;
  startDate?: string;
  days?: number;
  period?: string;
};

const url = '/api/analytics/orders';

export const fetchAnalyticsData = createAsyncThunk<
  GeneralAnalyticsData,
  FetchAnalyticsOrdersParams,
  { rejectValue: ErrorResponse }
>('analytics/fetchAnalyticsData', async (fetchData, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<GeneralAnalyticsData>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});
