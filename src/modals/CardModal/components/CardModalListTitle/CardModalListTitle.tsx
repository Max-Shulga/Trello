import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { changeListData } from '../../../../store/reducers/actions';
import InputForm from '../../../../ui/InputForm/InputForm';
import styles from './CardModalListTitle.module.scss';

function CardModalListTitle() :React.JSX.Element {
  const { title: listTitle, id } = useAppSelector((state) => state.board.selectedList);
  const [showInput, setShowInput] = useState(false);
  const dispatch = useAppDispatch();
  const { id: boardId } = useParams();

  const handleTitleSubmit: SubmitHandler<{ title: string }> = ({ title }) => {
    if (title) {
      dispatch(changeListData({
        listData: { title, id },
        boardId: Number(boardId),
      }));
    }
    setShowInput(false);
  };

  return (
    <section>
      <h5 className={styles.listTitle}>
        in list
        {' '}
        {showInput ? (
          <InputForm
            htmlId="changeCardTitle"
            onClose={() => setShowInput(false)}
            onSubmit={handleTitleSubmit}
            value={listTitle}
          />
        ) : (
          <button type="button" onClick={() => setShowInput(!showInput)}>

            <span>{listTitle}</span>
          </button>

        )}
      </h5>
    </section>
  );
}

export default CardModalListTitle;
