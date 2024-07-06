import React, { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import patternBoardTitle from '../../../../../common/constants/patternBoardTitle';
import { useAppDispatch } from '../../../../../store/hooks';
import { changeBoardTitle, deleteBoard } from '../../../../../store/reducers/actions';
import ActionButton from '../../../../../ui/ActionButton/ActionButton';
import Button from '../../../../../ui/Button/Button';
import InputForm from '../../../../../ui/InputForm/InputForm';
import ModalMenuContainer from '../../../../../ui/ModalContainer/ModalMenuContainer';
import styles from './BoardHeader.module.scss';

function BoardHeader({ title }: { title: string }): React.JSX.Element {
  const [showNewTitleInput, setShowNewTitleInput] = useState(false);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [newTitle, setNewTitle] = useState(title);
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.target.value);
  };

  const handleSubmit = (): void => {
    if (newTitle.trim()) dispatch(changeBoardTitle({ title: newTitle, boardId: Number(id) }));

    setShowNewTitleInput(false);
  };
  const handleDeleteBoard = (): void => {
    dispatch(deleteBoard({ boardId: Number(id) }));
    navigate('/');
  };

  return (
    <div className={styles.headerContainer}>
      <div role="button" tabIndex={0} onClick={() => setShowNewTitleInput(true)}>
        {showNewTitleInput ? (
          <InputForm
            htmlId="changeBoardName"
            onChange={handleInputChange}
            onClose={() => setShowNewTitleInput(false)}
            value={title}
            onSubmit={handleSubmit}
            validationPattern={patternBoardTitle}
          />
        ) : (
          <h3>{title}</h3>
        )}
      </div>
      <div className={styles.actionContainer}>
        <ActionButton showActions={showActions} setShowActions={setShowActions} className={styles.actionButton} />
        {showActions
          && (
            <ModalMenuContainer className={styles.modalMenu}>
              <Button onClick={handleDeleteBoard}>
                Delete Board
              </Button>
            </ModalMenuContainer>
          )}
      </div>

    </div>
  );
}

export default BoardHeader;
