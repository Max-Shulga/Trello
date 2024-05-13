import React, { ChangeEvent, useState } from 'react';

import { ICard } from '../../../../common/interfaces/ICard';
import { IChangeCardDataPayload } from '../../../../common/types/IChangeCardDataPayload';
import InputForm from '../../../../components/InputForm/InputForm';
import { changeCardData, deleteCard } from '../../../../store/actions';
import { AppDispatch } from '../../../../store/store';
import styles from './Card.module.scss';

interface CardProps extends ICard {
  dispatch: AppDispatch
  list_id: number
  boardId:number
}

function Card(props: CardProps):React.JSX.Element {
  const [showInput, setShowInput] = useState(false);
  const {
    list_id, title, dispatch, id, boardId,
  } = props;

  const [cardData, setCardData] = useState<IChangeCardDataPayload>({
    id,
    list_id,
    title: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setCardData({
      ...cardData,
      title: e.target.value,
    });
  };
  const handleSubmit = ():void => {
    setShowInput(false);

    if (cardData.title) dispatch(changeCardData({ cardData, boardId }));
  };
  const handleDelete = ():void => {
    dispatch(deleteCard({ cardId: cardData.id || 0, boardId }));
  };

  return (
    <li className={styles.cardContainer}>
      {showInput ? (
        <InputForm
          htmlId="changeCardTitle"
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          value={title}
        />
      ) : (
        <>
          <div>{title}</div>
          <button className={styles.changeCardTitleButton} onClick={() => setShowInput(true)} />
        </>
      )}
      <button className={styles.deleteCardButton} onClick={handleDelete} />
    </li>
  );
}
export default Card;
