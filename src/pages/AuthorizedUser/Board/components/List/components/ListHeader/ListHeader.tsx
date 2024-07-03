import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { IList } from '../../../../../../../common/interfaces/IList';
import { useAppDispatch } from '../../../../../../../store/hooks';
import { changeListData, deleteList } from '../../../../../../../store/reducers/actions';
import InputForm from '../../../../../../../ui/InputForm/InputForm';
import styles from './ListHeader.module.scss';

interface Props {
  list:IList
}

function ListHeader({ list }: Props): React.JSX.Element {
  const [showNewTitleInput, setShowNewTitleInput] = useState(false);

  const dispatch = useAppDispatch();
  const { id } = useParams();

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
      <button type="button" onClick={handleDeleteList} className={styles.cardOptionsButton}>
        del
      </button>
    </div>
  );
}

export default ListHeader;
