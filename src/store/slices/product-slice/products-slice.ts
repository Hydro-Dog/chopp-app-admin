import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse, PaginationResponse, Product } from '@shared/index';
import { FETCH_STATUS } from '@shared/index';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
  updateProductVisibility,
} from './actions';

export type ProductsState = {
  products?: PaginationResponse<Product>;
  createProductStatus: FETCH_STATUS;
  createProductError: ErrorResponse | null;
  fetchProductsStatus: FETCH_STATUS;
  fetchProductsError: ErrorResponse | null;
  updateProductStatus: FETCH_STATUS;
  updateProductError: ErrorResponse | null;
  deleteProductStatus: FETCH_STATUS;
  deleteProductError: ErrorResponse | null;
  updateProductVisibilityStatusMap: Record<string, FETCH_STATUS>;
  updateProductVisibilityError: ErrorResponse | null;
};

const initialState: ProductsState = {
  products: undefined,
  createProductStatus: FETCH_STATUS.IDLE,
  createProductError: null,
  fetchProductsStatus: FETCH_STATUS.IDLE,
  fetchProductsError: null,
  updateProductStatus: FETCH_STATUS.IDLE,
  updateProductError: null,
  deleteProductStatus: FETCH_STATUS.IDLE,
  deleteProductError: null,
  updateProductVisibilityStatusMap: {},
  updateProductVisibilityError: null,
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
      .addCase(updateProduct.fulfilled, (state) => {
        state.updateProductStatus = FETCH_STATUS.SUCCESS;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductStatus = FETCH_STATUS.ERROR;
        state.updateProductError = action.payload ?? {
          message: 'Unknown error',
        };
      })
      .addCase(updateProductVisibility.pending, (state, action) => {
        state.updateProductVisibilityStatusMap = {
          ...state.updateProductVisibilityStatusMap,
          [action.meta.arg.id]: FETCH_STATUS.LOADING,
        };
      })
      .addCase(updateProductVisibility.fulfilled, (state, action) => {
        state.updateProductVisibilityStatusMap[action.payload.id] = FETCH_STATUS.SUCCESS;
      })
      .addCase(updateProductVisibility.rejected, (state, action) => {
        state.updateProductVisibilityStatusMap[action.meta.arg.id] = FETCH_STATUS.ERROR;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductStatus = FETCH_STATUS.LOADING;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteProductStatus = FETCH_STATUS.SUCCESS;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductStatus = FETCH_STATUS.ERROR;
        state.deleteProductError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
