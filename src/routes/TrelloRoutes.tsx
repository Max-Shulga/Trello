import React from 'react';
import {
  createBrowserRouter, Navigate, RouteObject, RouterProvider,
} from 'react-router-dom';

import UserRoles from '../common/types/UserRoles';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import Layout from '../components/Layout/Layout';
import { useAppSelector } from '../store/hooks';
import authorizedRouter from './authorized.routes';
import notAuthorizedRouter from './notAuthorized.routes';

const getRoutesByRole = (role:UserRoles):RouteObject[] => {
  switch (role) {
    case UserRoles.AUTHORIZED:
      return [...authorizedRouter];
    case UserRoles.NOT_AUTHORIZED:
      return [...notAuthorizedRouter];
    default:
      return [];
  }
};

function TrelloRoutes(): React.ReactElement {
  const { role } = useAppSelector((state) => state.user);
  let router;

  switch (role) {
    case UserRoles.AUTHORIZED:
      router = createBrowserRouter([
        {
          path: '/',
          element: <Layout />,
          children: getRoutesByRole(role),
          errorElement: <Navigate to="/" />,
        },
      ]);
      break;
    case UserRoles.NOT_AUTHORIZED:
      router = createBrowserRouter([
        {
          path: '/',
          element: <AuthLayout />,
          children: getRoutesByRole(role),
          errorElement: <Navigate to="/sign-in" />,
        },
      ]);
      break;
    default:
      router = createBrowserRouter([]);
  }

  return (
    <RouterProvider router={router} />
  );
}

export default TrelloRoutes;
