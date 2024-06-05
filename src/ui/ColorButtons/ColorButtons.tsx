import React from 'react';

import styles from './ColorButtons.module.scss';

interface Props {
  color :string,
  onClick:(e: React.MouseEvent<HTMLInputElement>)=>void
}

function ColorButtons({ color, onClick }:Props): React.JSX.Element {
  return (
    <input
      type="radio"
      name="bgColor"
      className={styles.colorButton}
      style={{ background: color }}
      value={color}
      onClick={onClick}
    />
  );
}

export default ColorButtons;
