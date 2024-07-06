import React, { useState } from 'react';

import bgColors from '../../../../../../../common/constants/mainBgColors';
import ActionButton from '../../../../../../../ui/ActionButton/ActionButton';
import ColorButtons from '../../../../../../../ui/ColorButtons/ColorButtons';
import styles from './ColorPicker.module.scss';

interface Props {
  onClick:(e: React.MouseEvent<HTMLInputElement>)=>void
}

function ColorPicker({ onClick }:Props):React.JSX.Element {
  const [showMoreColors, setShowMoreColors] = useState(false);

  return (
    <div className={styles.backgroundPicker}>
      <div className={styles.presetColorsList}>
        {bgColors.main.map((color) => (
          <ColorButtons color={color} key={color} onClick={onClick} />
        ))}
        <ActionButton
          showActions={showMoreColors}
          setShowActions={setShowMoreColors}
        />
      </div>
      {' '}
      {showMoreColors && (
        <div className={styles.colorsDropMenu}>
          {bgColors.others.map((color) => (
            <ColorButtons color={color} key={color} onClick={onClick} />
          ))}
        </div>

      )}
    </div>
  );
}
export default ColorPicker;
