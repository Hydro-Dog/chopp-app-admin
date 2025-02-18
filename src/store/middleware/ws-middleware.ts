import { Middleware } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '@shared/enum';
import {
  AppDispatch,
  fetchCurrentUser,
  pushWsMessage,
  setWsConnected,
  setWsError,
  wsConnect,
  wsDisconnect,
  wsSend,
} from '@store/index';
import { pushWsNotification } from '@store/slices/notifications-slice';
import { io, Socket } from 'socket.io-client';

type WsAction = {
  type: string;
  payload?: any;
};

//@ts-ignore
export const wsMiddleware: Middleware = (store) => {
  let socket: Socket | null = null;

  return (next) => (action: WsAction) => {
    if (action) {
      switch (action?.type) {
        case wsConnect.toString():
          if (socket !== null) {
            socket.disconnect();
          }

          if (!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)) {
            console.error('WS Connection failed due to no access token in Local storage');

            return;
          }

          socket = io(action.payload.url, {
            transports: ['websocket'], // Используем только WebSocket транспорт
            auth: { accessToken: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) }, // Передача авторизационных данных, если требуется
          });

          socket.on('connect', () => {
            console.log('Socket.IO connected');
            store.dispatch(setWsConnected(true));
          });

          socket.on('connect_error', (error) => {
            console.error('Socket.IO connection error:', error);
            store.dispatch(setWsError(error));
          });

          socket.on('disconnect', () => {
            console.log('Socket.IO disconnected');
            store.dispatch(setWsConnected(false));
          });

          socket.on('message', (data) => {
            console.log('Message received:', data);
            store.dispatch(pushWsMessage(data));
          });

          socket.on('notification', (data) => {
            store.dispatch(pushWsNotification(data));
          });

          socket.on('tokenExpired', async (data) => {
            console.log('%c Token expired message!', 'color: red; font-weight: bold; font-size: 16px;', data);
          
            const dispatch: AppDispatch = store.dispatch;
          
            try {
              await dispatch(fetchCurrentUser()).unwrap();
              dispatch(
                wsConnect({
                  url: `${import.meta.env.VITE_BASE_WS}`,
                })
              );
            } catch (error) {
              console.error('%c Failed to refresh token, user will be logged out!', 'color: red; font-weight: bold; font-size: 14px;', error);
            }
          });
          

          break;

        case wsDisconnect.toString():
          if (socket !== null) {
            console.log('Disconnecting from Socket.IO server');
            socket.disconnect();
            socket = null;
          }
          break;

        case wsSend.toString():
          if (socket !== null) {
            const { type, payload } = action.payload;
            console.log('Sending message via Socket.IO:', action.payload);
            socket.emit(type, payload);
          }
          break;

        default:
          break;
      }

      return next(action);
    }
  };
};
