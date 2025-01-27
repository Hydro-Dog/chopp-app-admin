import { createBrowserRouter, Outlet } from 'react-router-dom';
import {
  AnalyticsPage,
  SignInPage,
  UsersPage,
  RegisterPage,
  ChatsPage,
  ActivityPage,
  UserPage,
  ProductsPage,
  SettingsPage,
} from '@pages/index';

import { PricingSettingsPage, VisualSettingsPage , PaymentSettingsPage} from '@pages/settings/pages';
import { MainMenu, ROUTES } from '@shared/index';
import { GuardedRoute } from './guarded-route';
import { WsWrapper } from '../ws/ws-wrapper';

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
        <WsWrapper />
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
        element: <ProductsPage />,
      },
      {
        path: ROUTES.CHATS,
        element: <ChatsPage />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <SettingsPage />,
          },
          {
            path: ROUTES.VISUAL_SETTINGS,
            element: <VisualSettingsPage />,
          },
          {
            path: ROUTES.PRICING_SETTINGS,
            element: <PricingSettingsPage />,
          },
          {
            path: ROUTES.PAYMENT_SETTINGS,
            element: <PaymentSettingsPage />,
          },
        ],
      },
      {
        path: ROUTES.ACTIVITY,
        element: <ActivityPage />,
      },
      {
        path: ROUTES.ANALYTICS,
        element: <AnalyticsPage />,
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
