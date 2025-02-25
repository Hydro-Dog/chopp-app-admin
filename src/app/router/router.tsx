import { createBrowserRouter, Outlet } from 'react-router-dom';
import {
  AnalyticsPage,
  SignInPage,
  UsersPage,
  RegisterPage,
  ChatsPage,
  OrdersPage,
  UserPage,
  ProductsPage,
  SettingsPage,
} from '@pages/index';

import { OrdersProvider } from '@pages/orders/context';
import { PaymentsPage } from '@pages/payments';
import {
  PricingSettingsPage,
  VisualSettingsPage,
  PaymentSettingsPage,
} from '@pages/settings/pages';
import { MainMenu, ROUTES } from '@shared/index';
import { GuardedRoute } from './utils/guarded-route';
import { InterceptorsWrapper } from './wrappers/interceptors-wrapper';

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
        <InterceptorsWrapper />
        <MainMenu />
      </GuardedRoute>
    ),
    children: [
      {
        path: '',
        element: <UsersPage />,
      },
      {
        path: ROUTES.PRODUCTS,
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
        path: ROUTES.ORDERS,
        element: (
          //TODO сделать отдельный компонент, чтоб в роутере не было вложенности
          <OrdersProvider>
            <OrdersPage />
          </OrdersProvider>
        ),
      },
      {
        path: ROUTES.PAYMENTS,
        element: <PaymentsPage />,
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
