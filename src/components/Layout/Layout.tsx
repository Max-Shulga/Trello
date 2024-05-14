import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

function Layout():React.JSX.Element {
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
