import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse } from '@shared/index';
import { createProduct } from './actions';
import { Product } from './types';
import { FETCH_STATUS } from '../../types/fetch-status';

export type ProductState = {
  products?: Product[];
  createProductStatus: FETCH_STATUS;
  createProductError: ErrorResponse | null;
};

const initialState: ProductState = {
  products: undefined,
  createProductStatus: FETCH_STATUS.IDLE,
  createProductError: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.createProductStatus = FETCH_STATUS.LOADING;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createProductStatus = FETCH_STATUS.SUCCESS;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProductStatus = FETCH_STATUS.ERROR;
        state.createProductError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
