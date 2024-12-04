import { createBrowserRouter } from 'react-router-dom';
import { AnalyticsPage } from '@pages/index';
import {
  SignInPage,
  UsersPage,
  RegisterPage,
  ChatsPage,
  ActivityPage,
  UserPage,
} from '@pages/index';
import { ProductsPage } from '@pages/products';
import { ROUTES } from '@shared/enum';
import { MainMenu } from '@shared/index';
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
