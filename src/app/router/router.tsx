import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
  SignInPage,
  UsersPage,
  RegisterPage,
  ChatsPage,
  ActivityPage,
  UserPage,
} from '@pages/index';
import { ROUTES } from '@shared/enum';
import { MainMenu } from '@shared/index';
import { GuardedRoute } from './guarded-route';
import { GoodsPage } from '@pages/goods';
import { SettingsPage } from '@pages/settings/settings-page';

export const router = createBrowserRouter([
  {
    path: ROUTES.SIGN_IN,
    element: <SignInPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.ROOT,
    element: (
      <GuardedRoute>
        <MainMenu />
      </GuardedRoute>
    ),
    children: [
      {
        path: '',
        element: <UsersPage />,
      },
      {
        path: ROUTES.GOODS,
        element: <GoodsPage />,
      },
      {
        path: ROUTES.CHATS,
        element: <ChatsPage />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: ROUTES.ACTIVITY,
        element: <ActivityPage />,
      },
      {
        path: `${ROUTES.USERS}/:id`, // Updated path for user profiles
        element: <UserPage />,
      },
    ],
  },
  // {
  //   path: '*', // Wildcard route for unknown paths
  //   element: <Navigate to={ROUTES.USERS} replace />,
  // },
]);
