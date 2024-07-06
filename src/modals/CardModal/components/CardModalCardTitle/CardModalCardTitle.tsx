import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { changeCardData } from '../../../../store/reducers/actions';
import InputForm from '../../../../ui/InputForm/InputForm';
import styles from './CardModalCardTitle.module.scss';

function CardModalCardTitle() :React.JSX.Element {
  const { selectedCard, selectedList } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const [showInput, setShowInput] = useState(false);
  const { title: cardTitle, id } = selectedCard!;
  const { id: listId } = selectedList!;
  const { id: boardId } = useParams();

  const handleSubmit: SubmitHandler<{ title: string }> = ({ title }) => {
    if (title) {
      dispatch(changeCardData({
        cardData: {
          id,
          title,
          list_id: listId,
        },
        boardId: Number(boardId),
      }));
    }
    setShowInput(!showInput);
  };

  return (
    <div className={styles.container}>
      {showInput ? (
        <InputForm
          htmlId="changeCardTitle"
          onClose={() => setShowInput(false)}
          onSubmit={handleSubmit}
          value={cardTitle}
        />
      ) : (
        <button type="button" onClick={() => setShowInput(!showInput)} className={styles.cardTitle}>
          {cardTitle}
          {' '}
        </button>
      )}

    </div>
  );
}

export default CardModalCardTitle;
