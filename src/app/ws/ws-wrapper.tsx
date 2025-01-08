import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  PropsWithChildrenOnly,
  useFilterWsMessages,
  ROUTES,
} from '@shared/index';
import { AppDispatch, fetchCurrentUser, wsConnect, wsDisconnect, wsSend } from '@store/index';
import { useAxiosInterceptors } from '@store/middleware';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';

export const WsWrapper = ({ children }: PropsWithChildrenOnly) => {
    const { pathname = '' } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { lastMessage: tokenExpiredMessage } = useFilterWsMessages(WS_MESSAGE_TYPE.TOKEN_EXPIRED);
  
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