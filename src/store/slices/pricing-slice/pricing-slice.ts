import { createSlice } from '@reduxjs/toolkit';
import { fetchPricing } from './actions'; // Импортируем новый thunk
import { FETCH_STATUS } from '../../types/fetch-status';

// Тип состояния для pricing
interface PricingState {
  submitStatus: FETCH_STATUS; // Статус отправки данных
  submitError: { message: string } | null; // Ошибка при отправке
}

// Начальное состояние
const initialState: PricingState = {
  submitStatus: FETCH_STATUS.IDLE, // Изначально статус "неактивен"
  submitError: null, // Ошибок нет
};

// Создаем slice
export const pricingSlice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {
    // Синхронные reducers (если нужны)
    resetSubmitStatus(state) {
      state.submitStatus = FETCH_STATUS.IDLE;
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Отправка данных началась
      .addCase(fetchPricing.pending, (state) => {
        state.submitStatus = FETCH_STATUS.LOADING;
        state.submitError = null; // Сбрасываем ошибку при новом запросе
      })
      // Отправка данных успешно завершена
      .addCase(fetchPricing.fulfilled, (state) => {
        state.submitStatus = FETCH_STATUS.SUCCESS;
      })
      // Отправка данных завершена с ошибкой
      .addCase(fetchPricing.rejected, (state, action) => {
        state.submitStatus = FETCH_STATUS.ERROR;
      });
  },
});
