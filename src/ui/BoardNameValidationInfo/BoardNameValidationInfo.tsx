import React, { useState } from 'react';

import infoIcon from '../../assets/infoIcon.svg';
import styles from './BoardNameValidationInfo.module.scss';

interface Props {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

function BoardNameValidationInfo({
  top,
  bottom,
  left,
  right,
}:Readonly<Props>): React.JSX.Element {
  const [showInfo, setShowInfo] = useState(false);

  return (

    <div
      className={styles.container}
      style={{
        top: `${top}px`,
        bottom: `${bottom}`,
        left: `${left}`,
        right: `${right}`,
      }}
    >
      <button
        aria-label="validation info"
        type="button"
        onClick={() => setShowInfo(!showInfo)}
        className={styles.infoIcon}
      >
        <img src={infoIcon} alt="" width="20px" height="20px" />
      </button>

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
export default BoardNameValidationInfo;
