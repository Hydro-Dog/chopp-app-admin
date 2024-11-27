import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ErrorResponse } from '@shared/index';
import { createCategory, deleteCategory, fetchCategories } from './actions';
import { Category } from './types';
import { FETCH_STATUS } from '../../types/fetch-status';

export type GoodsState = {
  categories?: Category[];
  fetchCategoriesStatus: FETCH_STATUS;
  fetchCategoriesError: ErrorResponse | null;
  createCategoryStatus: FETCH_STATUS;
  createCategoryError: ErrorResponse | null;
  updateCategoriesStatus: FETCH_STATUS;
  updateCategoriesError: ErrorResponse | null;
  deleteCategoryStatus: FETCH_STATUS;
  deleteCategoryError: ErrorResponse | null;
};

const initialState: GoodsState = {
  categories: undefined,
  fetchCategoriesStatus: FETCH_STATUS.IDLE,
  fetchCategoriesError: null,
  createCategoryStatus: FETCH_STATUS.IDLE,
  createCategoryError: null,
  updateCategoriesStatus: FETCH_STATUS.IDLE,
  updateCategoriesError: null,
  deleteCategoryStatus: FETCH_STATUS.IDLE,
  deleteCategoryError: null,
};

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchCategoriesStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.fetchCategoriesStatus = FETCH_STATUS.SUCCESS;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.fetchCategoriesStatus = FETCH_STATUS.ERROR;
        state.fetchCategoriesError = action.payload ?? {
          errorMessage: 'Failed to fetch user information',
        };
      })
      .addCase(createCategory.pending, (state) => {
        state.createCategoryStatus = FETCH_STATUS.LOADING;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.createCategoryStatus = FETCH_STATUS.SUCCESS;
        state.categories = [...(state.categories || []), action.payload];
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.createCategoryStatus = FETCH_STATUS.ERROR;
        state.createCategoryError = action.payload ?? {
          errorMessage: 'Failed to fetch user information',
        };
      })
      .addCase(deleteCategory.pending, (state) => {
        state.deleteCategoryStatus = FETCH_STATUS.LOADING;
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.deleteCategoryStatus = FETCH_STATUS.SUCCESS;
        state.categories = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteCategoryStatus = FETCH_STATUS.ERROR;
        state.deleteCategoryError = action.payload ?? {
          errorMessage: 'Failed to fetch user information',
        };
      });
  },
});
