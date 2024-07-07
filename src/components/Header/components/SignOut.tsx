import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SignOut.module.scss';

function SignOut(): React.ReactElement {
  const navigate = useNavigate();
  const handleSighOut = ():void => {
    localStorage.clear();
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
