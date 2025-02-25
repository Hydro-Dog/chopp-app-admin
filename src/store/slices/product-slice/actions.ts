import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ErrorResponse,
  PaginationResponse,
  PaginationRequestQuery,
  Product,
  PRODUCT_STATE,
} from '@shared/index';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';
import { UpdateProductVisibilityDTO } from './types';

export const fetchProducts = createAsyncThunk<
  PaginationResponse<Product>,
  { categoryId: string; state?: PRODUCT_STATE | PRODUCT_STATE[] } & PaginationRequestQuery,
  { rejectValue: ErrorResponse }
>(
  'products/fetchProducts',
  async (
    {
      categoryId,
      page,
      limit,
      search,
      sort,
      state = [PRODUCT_STATE.DEFAULT, PRODUCT_STATE.HIDDEN],
      order,
    },
    thunkAPI,
  ) => {
    try {
      const params = new URLSearchParams();

      if (page) params.append('page', String(page));
      if (limit) params.append('limit', String(limit));
      if (search) params.append('search', search);
      if (sort) params.append('sort', sort);
      if (order) params.append('order', order);
      if (categoryId) params.append('categoryId', categoryId);

      if (Array.isArray(state)) {
        state.forEach((s) => params.append('state', s));
      } else {
        params.append('state', state);
      }

      const response = await axiosPrivate.get<PaginationResponse<Product>>('/products', { params });
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
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
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
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
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
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});

export const deleteProduct = createAsyncThunk<
  unknown,
  { id: number },
  { rejectValue: ErrorResponse }
>('products/deleteProduct', async ({ id }, thunkAPI) => {
  try {
    const response = await axiosPrivate.delete<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});
