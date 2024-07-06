import { Dispatch, ReactElement, SetStateAction } from 'react';

import styles from './ActionButton.module.scss';

interface ActionButtonProps {
  showActions:boolean
  setShowActions: Dispatch<SetStateAction<boolean>>;
  className?:string
}

function ActionButton({ showActions, setShowActions, className = '' }:Readonly<ActionButtonProps>):ReactElement {
  const handleShowActions = (): void => {
    setShowActions((prev) => !prev);
  };

  return (
    <button
      type="button"
      className={`${styles.moreActions} ${className} ${showActions ? '' : styles.actionEffect} ${styles.hideActionEffect}`}
      onClick={handleShowActions}
      aria-label="show actions"
    />
  );
}
export default ActionButton;
