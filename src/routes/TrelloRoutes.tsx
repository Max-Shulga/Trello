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

const getRoutesByRole = (role: UserRoles):RouteObject[] => {
  switch (role) {
    case UserRoles.AUTHORIZED:
      return [
        ...authorizedRouter,
        { path: '*', element: <Navigate to="/" /> },
      ];
    case UserRoles.NOT_AUTHORIZED:
      return [
        ...notAuthorizedRouter,
        { path: '*', element: <Navigate to="/sign-in" /> },
      ];
    default:
      return [];
  }
};

function TrelloRoutes(): React.ReactElement {
  const { role } = useAppSelector((state) => state.user);

  const router = createBrowserRouter([
    {
      path: '/',
      element: role === UserRoles.AUTHORIZED ? <Layout /> : <AuthLayout />,
      children: getRoutesByRole(role),
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default TrelloRoutes;
