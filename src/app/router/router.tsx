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
  RootSettings,
} from '@pages/index';

import { Pricing } from '@pages/settings/components/utils/pricing';
import { VisualSettings } from '@pages/settings/components/utils/visual-settings';
import { MainMenu, ROUTES, SETTINGS_PATHS } from '@shared/index';
import { GuardedRoute } from './guarded-route';

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
            element: <RootSettings />,
          },
          {
            path: SETTINGS_PATHS.VISUAL_SETTINGS,
            element: <VisualSettings />,
          },
          {
            path: SETTINGS_PATHS.PRICING_SETTINGS,
            element: <Pricing />,
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
