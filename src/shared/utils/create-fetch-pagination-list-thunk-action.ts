import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginationResponse, SearchRequestParams } from '@shared/types';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';

// Универсальная функция для создания асинхронных запросов с динамическими параметрами
export function createFetchPaginationListThunkAction<
  T,
  Params extends SearchRequestParams,
  ErrorType,
>({ actionName, endpoint }: { actionName: string; endpoint: string }) {
  return createAsyncThunk<
    PaginationResponse<T>,
    Params & SearchRequestParams,
    { rejectValue: ErrorType }
  >(actionName, async (params, thunkAPI) => {
    try {
      // Создаем URLSearchParams и добавляем только непустые параметры
      const urlParams = new URLSearchParams();
      if (params.pageNumber) urlParams.append('pageNumber', String(params.pageNumber));
      if (params.limit) urlParams.append('limit', String(params.limit));
      if (params.search) urlParams.append('search', params.search);
      if (params.sort) urlParams.append('sort', params.sort);
      if (params.order) urlParams.append('order', params.order);
      if (params.filter) urlParams.append('filter', params.filter);

      const response = await axiosPrivate.get<PaginationResponse<T>>(endpoint, {
        params: urlParams,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Преобразуем ошибку в типизированный ответ отклонения
        return thunkAPI.rejectWithValue(error.response.data as ErrorType);
      } else {
        // Отлавливаем неизвестные ошибки
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' } as ErrorType);
      }
    }
  });
}
