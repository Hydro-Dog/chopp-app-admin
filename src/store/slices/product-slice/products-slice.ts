import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse, SearchResponse } from '@shared/index';
import { createProduct, fetchProducts } from './actions';
import { Product } from './types';
import { FETCH_STATUS } from '../../types/fetch-status';

export type ProductsState = {
  products?: SearchResponse<Product> ;
  createProductStatus: FETCH_STATUS;
  createProductError: ErrorResponse | null;
  fetchProductStatus: FETCH_STATUS;
  fetchProductError: ErrorResponse | null;
};

const initialState: ProductsState = {
  products: undefined,
  createProductStatus: FETCH_STATUS.IDLE,
  createProductError: null,
  fetchProductStatus: FETCH_STATUS.IDLE,
  fetchProductError: null,
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
      })
      .addCase(fetchProducts.pending, (state) => {
        state.fetchProductStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetchProductStatus = FETCH_STATUS.SUCCESS;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.fetchProductStatus = FETCH_STATUS.ERROR;
        state.fetchProductError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
