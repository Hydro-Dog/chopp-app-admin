/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { STORAGE_KEYS } from '@shared/enum';

export const GuardedRoute = (props: RouteProps) => {
  // @ts-ignore
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  return token ? <>{props.children}</> : <Navigate to="/signin" />;
};
