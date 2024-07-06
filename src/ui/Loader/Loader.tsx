import { ReactElement } from 'react';

import iconSpinner from '../../assets/iconSpinner.gif';
import styles from './Loader.module.scss';

function Loader():ReactElement {
  return (

    <div className={styles.wrapper}>
      <img className={styles.loading} src={iconSpinner} alt="loading spinner" />
    </div>

  );
}

export default Loader;
