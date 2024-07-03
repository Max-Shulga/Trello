import React from 'react';

import UserRoles from '../../../common/types/UserRoles';
import { useAppDispatch } from '../../../store/hooks';
import { setUserRole } from '../../../store/reducers/user/userSlice';
import styles from './SignOut.module.scss';

function SignOut(): React.ReactElement {
  const dispatch = useAppDispatch();
  const handleSighOut = ():void => {
    localStorage.clear();
    dispatch(setUserRole(UserRoles.NOT_AUTHORIZED));
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
