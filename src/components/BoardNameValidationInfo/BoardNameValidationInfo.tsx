import { useState } from 'react';

import styles from './BoardNameValidationInfo.module.scss';

export function BoardNameValidationInfo() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.container}>

      <span onClick={() => setShowInfo(!showInfo)} className={styles.infoIcon} />

      {showInfo && (
        <div className={styles.info}>
          <h4>The name of the board may contain:</h4>
          <p> Numbers, letters, spaces,</p>
          <p>dashes, periods, and underscores</p>
        </div>
      )}
    </div>
  );
}
