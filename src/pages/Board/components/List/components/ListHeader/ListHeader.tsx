import React, { useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import useEscape from '../../../../../../common/hooks/useEscape';
import useOutsideClick from '../../../../../../common/hooks/useOutsideClick';
import { IList } from '../../../../../../common/interfaces/IList';
import { useAppDispatch } from '../../../../../../store/hooks';
import { changeListData, deleteList } from '../../../../../../store/reducers/actions';
import ActionButton from '../../../../../../ui/ActionButton/ActionButton';
import Button from '../../../../../../ui/Button/Button';
import InputForm from '../../../../../../ui/InputForm/InputForm';
import ModalMenuContainer from '../../../../../../ui/ModalContainer/ModalMenuContainer';
import styles from './ListHeader.module.scss';

interface Props {
  list:IList
}

function ListHeader({ list }: Props): React.JSX.Element {
  const [showNewTitleInput, setShowNewTitleInput] = useState(false);

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [showActions, setShowActions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEscape(() => setShowActions(false));
  useOutsideClick(ref, () => setShowActions(false));

  const handleTitleSubmit: SubmitHandler<{ title: string }> = ({ title }) => {
    if (title) {
      dispatch(changeListData({
        listData: { title, id: list.id },
        boardId: Number(id),
      }));
    }
    setShowNewTitleInput(false);
  };
  const handleDeleteList = ():void => {
    dispatch(deleteList({ listId: list.id, boardId: Number(id) }));
  };

  return (
    <div className={styles.listHeader}>
      {showNewTitleInput ? (
        <InputForm
          htmlId="changeListTitle"
          onClose={() => setShowNewTitleInput(false)}
          value={list.title}
          onSubmit={handleTitleSubmit}
        />
      ) : (
        <button
          type="button"
          className={styles.listTitleButton}
          onClick={() => setShowNewTitleInput(true)}
        >
          {list.title}
        </button>
      )}
      <div className={styles.actionContainer} ref={ref}>
        <ActionButton showActions={showActions} setShowActions={setShowActions} className={styles.actionButton} />
        {showActions
          && (
            <ModalMenuContainer className={styles.modalMenu}>
              <Button onClick={handleDeleteList}>
                Delete List
              </Button>
            </ModalMenuContainer>
          )}
      </div>
    </div>
  );
}

export default ListHeader;
