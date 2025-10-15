import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router';
import ProtectedRoute from '@/components/ProtectedRoute';
import ErrorFallback from '@/ui/ErrorFallback';

const AppLayout = lazy(() => import('@/ui/AppLayout'));

const routes = [
  {
    index: true,
    element: <Navigate replace to="dashboard" />,
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        Component: lazy(() => import('@/pages/Dashboard')),
      },
      {
        path: 'bookings',
        Component: lazy(() => import('@/pages/Bookings')),
        ErrorBoundary: ErrorFallback,
      },
      {
        path: 'bookings/:bookingId',
        Component: lazy(() => import('@/pages/Booking')),
      },
      {
        path: 'checkin/:bookingId',
        Component: lazy(() => import('@/pages/Checkin')),
      },
      {
        path: 'cabins',
        Component: lazy(() => import('@/pages/Cabins')),
      },
      {
        path: 'users',
        Component: lazy(() => import('@/pages/Users')),
      },
      {
        path: 'settings',
        Component: lazy(() => import('@/pages/Settings')),
      },
      {
        path: 'account',
        Component: lazy(() => import('@/pages/Account')),
      },
    ],
  },
  {
    path: 'login',
    Component: lazy(() => import('@/pages/Login')),
  },
  {
    path: '*',
    Component: lazy(() => import('@/pages/PageNotFound')),
  },
] satisfies RouteObject[];

export default routes;
