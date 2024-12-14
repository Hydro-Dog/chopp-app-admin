import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, SearchResponse } from '@shared/index';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';
import { Product } from './types';

export const fetchProducts = createAsyncThunk<
  SearchResponse<Product>,
  { categoryId: string },
  { rejectValue: ErrorResponse }
>('products/fetchProducts', async ({ categoryId }, thunkAPI) => {
  try {
    const params = new URLSearchParams();
    if (categoryId) {
      params.append('categoryId', categoryId);
    }

    const response = await axiosPrivate.get<SearchResponse<Product>>('/products', { params });
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

// export const updateCategories = createAsyncThunk<
//   Category[],
//   Category[],
//   { rejectValue: ErrorResponse }
// >('goods/updateCategories', async (categories, thunkAPI) => {
//   try {
//     const response = await axiosPrivate.put<Category[]>('/categories', categories);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//     } else {
//       return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
//     }
//   }
// });

// export const deleteCategory = createAsyncThunk<Category[], string, { rejectValue: ErrorResponse }>(
//   'goods/deleteCategory',
//   async (id, thunkAPI) => {
//     try {
//       const response = await axiosPrivate.delete<Category[]>(`/categories/${id}`);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//       } else {
//         return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
//       }
//     }
//   },
// );

// export type UpdateCategoryTitleDTO = { id: string; title: string };

// export const updateCategoryTitle = createAsyncThunk<
//   Category,
//   UpdateCategoryTitleDTO,
//   { rejectValue: ErrorResponse }
// >('goods/updateCategoryTitle', async ({ id, title }, thunkAPI) => {
//   try {
//     const response = await axiosPrivate.put<Category>(`categories/${id}/title`, { title });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//     } else {
//       return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
//     }
//   }
// });
