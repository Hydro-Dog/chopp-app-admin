import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ErrorResponse } from '@shared/index';
import { FETCH_STATUS, Category } from '@shared/index';
import { createCategory, deleteCategory, fetchCategories, updateCategoryTitle } from './actions';

export type ProductCategoryState = {
  categories?: Category[];
  fetchCategoriesStatus: FETCH_STATUS;
  fetchCategoriesError: ErrorResponse | null;
  createCategoryStatus: FETCH_STATUS;
  createCategoryError: ErrorResponse | null;
  updateCategoriesStatus: FETCH_STATUS;
  updateCategoriesError: ErrorResponse | null;
  deleteCategoryStatus: FETCH_STATUS;
  deleteCategoryError: ErrorResponse | null;
  updateCategoryTitleStatus: FETCH_STATUS;
  updateCategoryTitleError: ErrorResponse | null;
};

const initialState: ProductCategoryState = {
  categories: undefined,
  fetchCategoriesStatus: FETCH_STATUS.IDLE,
  fetchCategoriesError: null,
  createCategoryStatus: FETCH_STATUS.IDLE,
  createCategoryError: null,
  updateCategoriesStatus: FETCH_STATUS.IDLE,
  updateCategoriesError: null,
  deleteCategoryStatus: FETCH_STATUS.IDLE,
  deleteCategoryError: null,
  updateCategoryTitleStatus: FETCH_STATUS.IDLE,
  updateCategoryTitleError: null,
};

export const productCategorySlice = createSlice({
  name: 'productCategory',
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
          message: 'Unknown error',
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
          message: 'Unknown error',
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
          message: 'Unknown error',
        };
      })
      .addCase(updateCategoryTitle.pending, (state) => {
        state.updateCategoryTitleStatus = FETCH_STATUS.LOADING;
      })
      .addCase(updateCategoryTitle.fulfilled, (state, action: PayloadAction<Category>) => {
        state.updateCategoryTitleStatus = FETCH_STATUS.SUCCESS;
        state.categories = state.categories?.map((item) =>
          item.id === action.payload.id ? { ...item, title: action.payload.title } : item,
        );
      })
      .addCase(updateCategoryTitle.rejected, (state, action) => {
        state.updateCategoryTitleStatus = FETCH_STATUS.ERROR;
        state.updateCategoryTitleError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
