import { SignIn, SignUp } from '../pages/notAuthorizedUser';
import { NotAuthorizedUserRoutes } from './routes.names';

export default [
  {
    path: NotAuthorizedUserRoutes.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: NotAuthorizedUserRoutes.SIGN_UP,
    element: <SignUp />,
  },
];
