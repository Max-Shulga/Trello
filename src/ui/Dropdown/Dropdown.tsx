import React, {
  ReactElement, useRef, useState,
} from 'react';

import dropDownIcon from '../../assets/dropDownIcon.svg';
import useOutsideClick from '../../common/hooks/useOutsideClick';
import ModalMenuContainer from '../ModalContainer/ModalMenuContainer';
import styles from './Dropdown.module.scss';

interface DropdownProps {
  defaultValue: string
  children:ReactElement | ReactElement[]
}

function Dropdown({ children, defaultValue }: DropdownProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className={styles.dropDownContainer}
      ref={dropdownRef}
    >
      <button type="button" onClick={handleToggle} className={styles.dropDownToggle}>
        <img src={dropDownIcon} alt="drop down arrow looks down" width={24} height={24} />
        {defaultValue}
      </button>
      {isOpen && (
        <ModalMenuContainer className={styles.dropDownMenu}>
          <div
            role="button"
            tabIndex={0}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            className={styles.menuContent}
          >
            {children}
          </div>
        </ModalMenuContainer>
      )}
    </div>
  );
}

export default Dropdown;
