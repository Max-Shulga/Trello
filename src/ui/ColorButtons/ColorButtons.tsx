import React from 'react';

import styles from './ColorButtons.module.scss';

interface Props {
  color :string,
  onClick:(color:string)=>void
}

function ColorButtons({ color, onClick }:Props): React.JSX.Element {
  return (
    <input
      type="radio"
      name="bgColor"
      className={styles.colorButton}
      style={{ background: color }}
      value={color}
      onClick={() => onClick(color)}
    />
  );
}

export default ColorButtons;
