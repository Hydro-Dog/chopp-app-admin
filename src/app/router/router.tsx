import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
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
import { ProductsProvider } from '@pages/products/context';
import {
  PricingSettingsPage,
  VisualSettingsPage,
  PaymentSettingsPage,
  WorkingHoursSettings,
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
        {/* <Navigate to={ROUTES.ORDERS} replace /> */}
      </GuardedRoute>
    ),
    children: [
      // {
      //   path: '',
      //   element: <UsersPage />,
      // },
      {
        path: '',
        element: (
          <OrdersProvider>
            <OrdersPage />
          </OrdersProvider>
        ),
      },
      {
        path: ROUTES.PRODUCTS,
        element: (
          <ProductsProvider>
            <ProductsPage />
          </ProductsProvider>
        ),
      },
      // {
      //   path: ROUTES.CHATS,
      //   element: <ChatsPage />,
      // },
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
          {
            path: ROUTES.TIME_SETTINGS,
            element: <WorkingHoursSettings />,
          },
        ],
      },
      {
        path: ROUTES.PAYMENTS,
        element: <PaymentsPage />,
      },
      // {
      //   path: ROUTES.ANALYTICS,
      //   element: <AnalyticsPage />,
      // },
      // {
      //   path: `${ROUTES.USERS}/:id`, // Updated path for user profiles
      //   element: <UserPage />,
      // },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.ORDERS} replace />,
  },
]);
