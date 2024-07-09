import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import seeker from '../../assets/seeker.svg';
import routesNames from '../../routes/routes.names';
import Button from '../../ui/Button/Button';
import styles from './ErrorPage.module.scss';

function ErrorPage():ReactElement {
  return (
    <section className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={seeker} alt="seeker" />
      </div>
      <div className={styles.body}>
        <h1 className={styles.header}>
          404
        </h1>
        <p className={styles.text1}>OOOps!</p>
        <p className={styles.text1}>Page Not Found</p>
        <p className={styles.text2}>
          This page doesn’t exist or was removed!
          We suggest you back to home
        </p>
        <Button className={styles.button}>
          <Link to={routesNames.HOME}>Back to homepage</Link>
        </Button>
      </div>
    </section>
  );
}
export default ErrorPage;
