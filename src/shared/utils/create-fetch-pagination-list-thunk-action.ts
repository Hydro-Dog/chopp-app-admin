import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginationResponse, PaginationRequestQuery } from '@shared/types';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';

// Универсальная функция для создания асинхронных запросов с динамическими параметрами
export function createFetchPaginationListThunkAction<
  T,
  Params extends PaginationRequestQuery,
  ErrorType,
>({ actionName, endpoint }: { actionName: string; endpoint: string }) {
  return createAsyncThunk<
    PaginationResponse<T>,
    Params & PaginationRequestQuery,
    { rejectValue: ErrorType }
  >(actionName, async (params, thunkAPI) => {
    try {
      // Создаем URLSearchParams и добавляем только непустые параметры
      const urlParams = new URLSearchParams();
      if (params.page) urlParams.append('page', String(params.page));
      if (params.limit) urlParams.append('limit', String(params.limit));
      if (params.search) urlParams.append('search', params.search);
      if (params.sort) urlParams.append('sort', params.sort);
      if (params.order) urlParams.append('order', params.order);
      if (params.startDate) urlParams.append('startDate', params.startDate);
      if (params.endDate) urlParams.append('endDate', params.endDate);
      if (params.status) urlParams.append('status', String(params.status));
      // if (params.filter) urlParams.append('filter', params.filter);

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
