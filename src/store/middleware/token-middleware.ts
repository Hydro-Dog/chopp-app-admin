import { useEffect } from 'react';
import { STORAGE_KEYS } from '@shared/enum';
import axios from 'axios';

type FailedQueRequest = {
  resolve: (val: unknown) => void;
  reject: (val: unknown) => void;
};

// Конфигурация API
export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosDefault = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

// Функция для обновления токена
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    const response = await axiosDefault.post('auth/refresh', { refreshToken });
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    window.location.href = '/signin'; // Редирект на страницу логина
    throw new Error('Session expired, please log in again');
  }
};

// Используем React hook для настройки интерсепторов
export const useAxiosInterceptors = () => {
  // Обработка очереди запросов при обновлении токена
  let isRefreshing = false;
  let failedQueue: FailedQueRequest[] = [];

  const processQueue = (error: unknown, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  // Интерсепторы запросов
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return axios(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          return new Promise((resolve, reject) => {
            refreshAccessToken()
              .then((newToken) => {
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                processQueue(null, newToken);
                resolve(axios(originalRequest));
              })
              .catch((err) => {
                processQueue(err, null);
                reject(err);
              })
              .finally(() => {
                isRefreshing = false;
              });
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};
