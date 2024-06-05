import React from 'react';

import styles from './Footer.module.scss';

function Footer():React.JSX.Element {
  return (
    <footer className={styles.footer}>
      © 2024. All rights reserved. | Privacy Policy | Terms of Service
    </footer>
  );
}
export default Footer;
