import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthLayout from './components/AuthLayout/AuthLayout';
import Layout from './components/Layout/Layout';
import CardModal from './modals/CardModal/CardModal';
import SignIn from './pages/Auth/SignIn/SignIn';
import SignUp from './pages/Auth/SignUp/SignUp';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import RouteNames from './routes/routes.names';
import store from './store/store';

function App():ReactElement {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={RouteNames.HOME} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={RouteNames.BOARD} element={<Board />}>
              <Route path={RouteNames.CARD_MODAL} element={<CardModal />} />
            </Route>
          </Route>
          <Route path={RouteNames.AUTH} element={<AuthLayout />}>
            <Route path={RouteNames.SIGN_IN} element={<SignIn />} />
            <Route path={RouteNames.SIGN_UP} element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </Provider>
  );
}

export default App;
