import { Board, CardModal, Home } from '../pages/AuthorizedUser';
import { AuthorizedUserRoutes } from './routes.names';

export default [
  {
    path: AuthorizedUserRoutes.HOME,
    element: <Home />,
  },
  {
    path: AuthorizedUserRoutes.BOARD,
    element: <Board />,
    children: [
      {
        path: AuthorizedUserRoutes.CARD_MODAL,
        element: <CardModal />,
      },
    ],
  },

];
