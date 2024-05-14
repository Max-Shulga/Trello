import React, { ChangeEvent, useState } from 'react';

import { ICard } from '../../../../common/interfaces/ICard';
import { IChangeCardDataPayload } from '../../../../common/types/IChangeCardDataPayload';
import InputForm from '../../../../components/InputForm/InputForm';
import { changeCardData, deleteCard } from '../../../../store/actions';
import { useAppDispatch } from '../../../../store/hooks';
import styles from './Card.module.scss';

interface CardProps extends ICard {
  list_id: number
}

function Card(props: CardProps):React.JSX.Element {
  const [showInput, setShowInput] = useState(false);
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    list_id, title, id,
  } = props;

  const [cardData, setCardData] = useState<IChangeCardDataPayload>({
    id,
    list_id,
    title: '',
  });
  const dispatch = useAppDispatch();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setCardData({
      ...cardData,
      title: e.target.value,
    });
  };
  const handleSubmit = ():void => {
    setShowInput(false);

    if (cardData.title) dispatch(changeCardData(cardData));
  };
  const handleDelete = ():void => {
    dispatch(deleteCard(cardData.id ?? 0));
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
          <button
            type="button"
            aria-label="Change card title"
            className={styles.changeCardTitleButton}
            onClick={() => setShowInput(true)}
          />
        </>
      )}
      <button type="button" aria-label="Delete card" className={styles.deleteCardButton} onClick={handleDelete} />
    </li>
  );
}
export default Card;
