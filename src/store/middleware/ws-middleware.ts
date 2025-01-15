import { Middleware } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '@shared/enum';
import {
  pushWsMessage,
  setWsConnected,
  setWsError,
  wsConnect,
  wsDisconnect,
  wsSend,
} from '@store/index';
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

          socket.on('tokenExpired', (data) => {
            console.log('Token expired message:', data);
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
            console.log('Sending message via Socket.IO:', action.payload);
            socket.emit('message', action.payload);
          }
          break;

        default:
          break;
      }

      return next(action);
    }
  };
};
