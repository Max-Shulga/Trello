import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import routesNames from '../../routes/routes.names';
import styles from './AuthLayout.module.scss';

function AuthLayout(): React.ReactElement {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('refreshToken');
  useEffect(() => {
    if (isLogin) {
      navigate(routesNames.HOME);
    }
  }, [navigate, isLogin]);

  return (
    <section className={styles.container}>
      <Outlet />
    </section>
  );
}
export default AuthLayout;
