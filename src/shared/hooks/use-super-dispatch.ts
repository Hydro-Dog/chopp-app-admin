import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { ErrorResponse, useNotificationContext } from '@shared/index';
import { AppDispatch } from '@store/store';

/**
 * Дженерики:
 * @template R - Тип данных, которые возвращаются в результате выполнения асинхронного thunk-экшена.
 * @template A - Тип аргумента, который передается в асинхронный thunk-экшен.
 */
type Args<R, A> = {
  /**
   * Асинхронный thunk-экшен, который выполняется через `dispatch`.
   * Он принимает аргумент типа `A` и возвращает промис с результатом типа `R`.
   */
  action: AsyncThunkAction<R, A, { rejectValue: ErrorResponse }>;

  /**
   * Функция-обработчик успешного выполнения экшена.
   * Принимает результат `R`.
   */
  thenHandler?: (value: R) => void;

  /**
   * Необязательная функция-обработчик ошибки.
   * Принимает объект `ErrorResponse`, содержащий данные об ошибке.
   * Если не передана, будет использоваться стандартный обработчик.
   */
  catchHandler?: (error: ErrorResponse) => void;
};

/**
 * Кастомный хук, который упрощает работу с Redux-thunk экшенами,
 * автоматически обрабатывая ошибки и успешные ответы.
 *
 * @returns {Object} - Объект с функцией `superDispatch`,
 * которая выполняет `dispatch` экшена и обрабатывает результаты.
 */
export const useSuperDispatch = <R, A>() => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorNotification } = useNotificationContext();

  /**
   * Стандартный обработчик ошибок, который показывает уведомление.
   *
   * @param {ErrorResponse} error - Объект ошибки с описанием проблемы.
   */
  const defaultErrorHandler = (error: ErrorResponse) => {
    showErrorNotification({
      message: t('Ошибка'),
      description: error?.message,
    });
  };

  /**
   * Функция для выполнения Redux-thunk экшенов с автоматической обработкой ошибок и успеха.
   *
   * @param {Args<R, A>} args - Объект с экшеном, обработчиком успеха и (необязательным) обработчиком ошибок.
   */
  const superDispatch = ({ action, thenHandler, catchHandler }: Args<R, A>) =>
    dispatch(action)
      .unwrap()
      .then(thenHandler as (value: R) => void)
      .catch(catchHandler || defaultErrorHandler);

  return { superDispatch };
};
