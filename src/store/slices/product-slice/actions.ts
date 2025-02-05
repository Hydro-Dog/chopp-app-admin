import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, PaginationResponse, SearchRequestParams, Product } from '@shared/index';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';

export const fetchProducts = createAsyncThunk<
  PaginationResponse<Product>,
  { categoryId: string } & SearchRequestParams,
  { rejectValue: ErrorResponse }
>(
  'products/fetchProducts',
  async ({ categoryId, pageNumber, limit, search, sort, order }, thunkAPI) => {
    try {
      console.log('search: ', search);
      const params = new URLSearchParams({
        pageNumber: String(pageNumber || 1),
        limit: String(limit || 10),
        search: search || '',
        sort: sort || '',
        order: order || 'asc',
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
