import React, { useState } from 'react';

import bgColors from '../../../../../../common/constants/mainBgColors';
import ActionButton from '../../../../../../ui/ActionButton/ActionButton';
import ColorButtons from '../../../../../../ui/ColorButtons/ColorButtons';
import styles from './ColorPicker.module.scss';

interface Props {
  onClick:(color:string)=>void
}

function ColorPicker({ onClick }:Props):React.JSX.Element {
  const [showMoreColors, setShowMoreColors] = useState(false);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const handleGetCustomColor = ():void => {
    onClick(`rgb(${red}, ${green}, ${blue})`);
  };

  const handleRedChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setRed(Number(e.target.value));
    handleGetCustomColor();
  };

  const handleGreenChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setGreen(Number(e.target.value));
    handleGetCustomColor();
  };

  const handleBlueChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setBlue(Number(e.target.value));
    handleGetCustomColor();
  };

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
          <div className={styles.simpleColors}>
            {bgColors.others.map((color) => (
              <ColorButtons color={color} key={color} onClick={onClick} />
            ))}
          </div>
          <hr className={styles.separator} />
          <div className={styles.customColorSelector}>
            <h5>Create  custom color</h5>
            <label>
              R
              <input type="range" min="0" max="255" value={red} onChange={handleRedChange} />
            </label>
            <label>
              G
              <input type="range" min="0" max="255" value={green} onChange={handleGreenChange} />
            </label>
            <label>
              B
              <input type="range" min="0" max="255" value={blue} onChange={handleBlueChange} />
            </label>
          </div>
        </div>

      )}
    </div>
  );
}
export default ColorPicker;
