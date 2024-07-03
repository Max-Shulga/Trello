import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import UserRoles from '../../common/types/UserRoles';
import { useAppSelector } from '../../store/hooks';
import styles from './AuthLayout.module.scss';

function AuthLayout(): React.ReactElement {
  const { role } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (role === UserRoles.NOT_AUTHORIZED) {
      navigate('/sign-in');
    }
  }, [role]);

  return (
    <section className={styles.container}>
      <Outlet />
    </section>
  );
}
export default AuthLayout;
