import React from 'react';

import closeIcon from '../../../../../../assets/closeIcon.svg';
import styles from '../BoardForm.module.scss';

function BoardFormHeader({ onClose }:{ onClose:()=>void }):React.JSX.Element {
  return (
    <legend className={styles.header}>
      <h2>Create board</h2>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        <img src={closeIcon} alt="close icon" />
      </button>
    </legend>
  );
}

export default BoardFormHeader;
