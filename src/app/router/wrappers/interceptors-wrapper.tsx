import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { PropsWithChildrenOnly, ROUTES } from '@shared/index';
import { AppDispatch, fetchCurrentUser, wsConnect, wsDisconnect } from '@store/index';
import { useAxiosInterceptors } from '@store/middleware';

export const InterceptorsWrapper = ({ children }: PropsWithChildrenOnly) => {
  const { pathname = '' } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useAxiosInterceptors();

  useEffect(() => {
    //TODO: Добавить проверку на истекший токен, если истек то повторно соединиться через 1c
    if (pathname !== ROUTES.SIGN_IN && pathname !== ROUTES.REGISTER) {
      dispatch(fetchCurrentUser());
    }
    dispatch(
      wsConnect({
        url: `${import.meta.env.VITE_BASE_WS}`,
      }),
    );

    return () => wsDisconnect();
  }, [dispatch]);

  return children;
};
