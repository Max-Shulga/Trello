import React, { useState } from 'react';

import NewBoardForm from '../NewBoardForm/NewBoardForm';
import styles from './NewBoardControl.module.scss';

function NewBoardControl() :React.JSX.Element {
  const [isNewBoardVisible, setIsNewBoardVisible] = useState(false);

  return (
    <>
      <button type="button" className={styles.addNewBoardButton} onClick={() => setIsNewBoardVisible(true)}>
        <div>Create new board</div>
      </button>
      {isNewBoardVisible && <NewBoardForm onClick={() => setIsNewBoardVisible(false)} />}
    </>
  );
}
export default NewBoardControl;
