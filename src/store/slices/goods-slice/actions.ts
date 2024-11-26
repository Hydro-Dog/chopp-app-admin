import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse } from '@shared/index';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';
import { Category, CreateCategoryDTO } from './types';

export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: ErrorResponse }>(
  'goods/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get<Category[]>('/categories');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
      } else {
        return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
      }
    }
  },
);

export const createCategory = createAsyncThunk<
  Category,
  CreateCategoryDTO,
  { rejectValue: ErrorResponse }
>('goods/createCategory', async (newCategory, thunkAPI) => {
  try {
    const response = await axiosPrivate.post<Category>(`/categories`, newCategory);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Return the error message as part of the rejection
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      // Handle unexpected errors
      return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
    }
  }
});

export const updateCategories = createAsyncThunk<
  Category[],
  Category[],
  { rejectValue: ErrorResponse }
>('goods/updateCategories', async (categories, thunkAPI) => {
  try {
    const response = await axiosPrivate.put<Category[]>('/categories', categories);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
    }
  }
});
