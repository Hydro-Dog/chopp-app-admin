import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import {
  pushWsMessage,
  setWsConnected,
  setWsError,
  wsConnect,
  wsDisconnect,
  wsSend,
} from '@store/index';

type WsAction = {
  type: string;
  payload?: any;
};

export const wsMiddleware: Middleware = (store) => {
  let socket: Socket | null = null;

  return (next) => (action: WsAction) => {
    switch (action.type) {
      case wsConnect.toString():
        if (socket !== null) {
          socket.disconnect();
        }

        console.log('Connecting to Socket.IO server at: ', action.payload.url);
        socket = io(action.payload.url, {
          transports: ['websocket'], // Используем только WebSocket транспорт
          auth: action.payload.auth, // Передача авторизационных данных, если требуется
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
  };
};
