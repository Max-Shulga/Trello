import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ColorListParams {
  colors: string[]
  onClick: (color: string, button: HTMLButtonElement) => void
  className: string
}

function ColorButtons(props: ColorListParams):React.JSX.Element {
  const { colors, onClick, className } = props;
  const handleColorButtonClick = (color: string, button: HTMLButtonElement):void => {
    if (onClick) {
      onClick(color, button);
    }
  };

  return (
    <>
      {colors.map((buttonBg, index) => (
        <button
          type="button"
          key={uuidv4()}
          className={className}
          style={{ background: buttonBg }}
          aria-label={`Color button ${index + 1}`}
          onClick={(e) => handleColorButtonClick(buttonBg, e.target as HTMLButtonElement)}
        />
      ))}
    </>
  );
}

export default ColorButtons;
