import React from 'react';

import newBoardCreatorPresetBoard from '../../../../../../assets/newBoardCreatorPresetBoard.svg';
import styles from '../BoardForm.module.scss';

function BoardBGPreview({ color }: { color: string }): React.JSX.Element {
  return (
    <div className={styles.boardPreViewer} style={{ background: color }}>
      <img src={newBoardCreatorPresetBoard} alt="color sensetiv background" />
    </div>
  );
}

export default BoardBGPreview;
