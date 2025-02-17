import { LIMIT } from '@pages/products/context';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, PaginationResponse, PaginationRequestQuery, Product } from '@shared/index';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';
import { UpdateProductVisibilityDTO } from './types';

export const fetchProducts = createAsyncThunk<
  PaginationResponse<Product>,
  { categoryId: string } & PaginationRequestQuery,
  { rejectValue: ErrorResponse }
>('products/fetchProducts', async ({ categoryId, page, limit, search, sort, order }, thunkAPI) => {
  try {
    const params = new URLSearchParams({
      page: String(page || 1),
      limit: String(limit || LIMIT),
      search: search || '',
      sort: sort || '',
      order: order || 'desc',
      categoryId: categoryId,
    });

    const response = await axiosPrivate.get<PaginationResponse<Product>>('/products', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});

export const createProduct = createAsyncThunk<
  Product,
  { form: FormData },
  { rejectValue: ErrorResponse }
>('products/createProduct', async ({ form }, thunkAPI) => {
  try {
    const response = await axiosPrivate.post<Product>(`/products`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

export const updateProduct = createAsyncThunk<
  Product,
  { form: FormData; id: number },
  { rejectValue: ErrorResponse }
>('products/updateProduct', async ({ form, id }, thunkAPI) => {
  try {
    const response = await axiosPrivate.put<Product>(`/products/${id}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

export const updateProductVisibility = createAsyncThunk<
  Product,
  UpdateProductVisibilityDTO,
  { rejectValue: ErrorResponse }
>('products/updateProductState', async ({ state, id }, thunkAPI) => {
  try {
    const response = await axiosPrivate.patch<Product>(`/products/${id}/state`, { state });
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
