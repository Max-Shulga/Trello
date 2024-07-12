import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './SignOut.module.scss';

function SignOut(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSighOut = ():void => {
    localStorage.setItem('token', '');
    localStorage.setItem('refreshToken', '');
    localStorage.setItem('redirectUrl', location.pathname);
    navigate('auth/sign-in');
  };

  return (
    <button
      type="button"
      className={styles.singOutContainer}
      onClick={handleSighOut}
    >
      Sign out
    </button>
  );
}

export default SignOut;
