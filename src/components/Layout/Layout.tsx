import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import UserRoles from '../../common/types/UserRoles';
import { useAppSelector } from '../../store/hooks';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

function Layout():React.JSX.Element {
  const { role } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (role === UserRoles.AUTHORIZED) {
      navigate('/');
    }
  }, [role]);

  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Layout;
