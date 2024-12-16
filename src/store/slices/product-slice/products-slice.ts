import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse, SearchResponse } from '@shared/index';
import { createProduct, fetchProducts, updateProduct } from './actions';
import { Product } from './types';
import { FETCH_STATUS } from '../../types/fetch-status';

export type ProductsState = {
  products?: SearchResponse<Product>;
  createProductStatus: FETCH_STATUS;
  createProductError: ErrorResponse | null;
  fetchProductsStatus: FETCH_STATUS;
  fetchProductsError: ErrorResponse | null;
  updateProductStatus: FETCH_STATUS;
  updateProductError: ErrorResponse | null;
};

const initialState: ProductsState = {
  products: undefined,
  createProductStatus: FETCH_STATUS.IDLE,
  createProductError: null,
  fetchProductsStatus: FETCH_STATUS.IDLE,
  fetchProductsError: null,
  updateProductStatus: FETCH_STATUS.IDLE,
  updateProductError: null,
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
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProductStatus = FETCH_STATUS.SUCCESS;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProductStatus = FETCH_STATUS.ERROR;
        state.createProductError = action.payload ?? {
          message: 'Unknown error',
        };
      })
      .addCase(fetchProducts.pending, (state) => {
        state.fetchProductsStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetchProductsStatus = FETCH_STATUS.SUCCESS;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.fetchProductsStatus = FETCH_STATUS.ERROR;
        state.fetchProductsError = action.payload ?? {
          message: 'Unknown error',
        };
      })
      .addCase(updateProduct.pending, (state) => {
        state.updateProductStatus = FETCH_STATUS.LOADING;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductStatus = FETCH_STATUS.SUCCESS;
        // const currentCategory = state.products?.items[0].category.id;

        // let items: Product[] = [];
        // if (currentCategory === action.payload.category.id) {
        //   items =
        //     state.products?.items.map((item) =>
        //       item.id === action.payload.id ? action.payload : item,
        //     ) || [];
        // } else {
        //   items =
        //     state.products?.items.map((item) =>
        //       item.id === action.payload.id ? action.payload : item,
        //     ) || [];
        // }

        // state.products = { ...state.products, items };
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductStatus = FETCH_STATUS.ERROR;
        state.updateProductError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
