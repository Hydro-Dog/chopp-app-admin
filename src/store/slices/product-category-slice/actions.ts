import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, Category } from '@shared/index';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';
import { CreateCategoryDTO } from './types';

export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: ErrorResponse }>(
  'productCategory/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get<Category[]>('/categories');
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

export const createCategory = createAsyncThunk<
  Category,
  CreateCategoryDTO,
  { rejectValue: ErrorResponse }
>('productCategory/createCategory', async (newCategory, thunkAPI) => {
  try {
    const response = await axiosPrivate.post<Category>(`/categories`, newCategory);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Return the error message as part of the rejection
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      // Handle unexpected errors
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});

export const updateCategories = createAsyncThunk<
  Category[],
  Category[],
  { rejectValue: ErrorResponse }
>('productCategory/updateCategories', async (categories, thunkAPI) => {
  try {
    const response = await axiosPrivate.put<Category[]>('/categories', categories);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});

export const deleteCategory = createAsyncThunk<Category[], string, { rejectValue: ErrorResponse }>(
  'productCategory/deleteCategory',
  async (id, thunkAPI) => {
    try {
      const response = await axiosPrivate.delete<Category[]>(`/categories/${id}`);
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

export type UpdateCategoryTitleDTO = { id: string; title: string };

export const updateCategoryTitle = createAsyncThunk<
  Category,
  UpdateCategoryTitleDTO,
  { rejectValue: ErrorResponse }
>('productCategory/updateCategoryTitle', async ({ id, title }, thunkAPI) => {
  try {
    const response = await axiosPrivate.put<Category>(`categories/${id}/title`, { title });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});
