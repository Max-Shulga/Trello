import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IList } from '../../../../../../../common/interfaces/IList';
import { IChangeCardDataPayload } from '../../../../../../../common/types/IChangeCardDataPayload';
import { useAppDispatch } from '../../../../../../../store/hooks';
import { addCard } from '../../../../../../../store/reducers/actions';
import InputForm from '../../../../../../../ui/InputForm/InputForm';
import styles from './CardCreator.module.scss';

interface Props {
  list: IList
}

function CardCreator({ list }: Props): React.JSX.Element {
  const [showNewCardInput, setShowNewCardInput] = useState(false);
  const [newCard, setNewCard] = useState<IChangeCardDataPayload>({
    title: '',
    position: list.cards.length + 1,
    list_id: list.id,
  });
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const handleCardInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newCardValue = e.target.value;
    setNewCard({
      ...newCard,
      title: newCardValue,
    });
  };
  useEffect(() => {
    setNewCard({ ...newCard, position: list.cards.length + 1 });
  }, [list]);
  const handleCardSubmit = (): void => {
    setShowNewCardInput(false);

    if (newCard.title) dispatch(addCard({ cardData: newCard, boardId: Number(id) }));
  };

  return (
    <div>
      {showNewCardInput ? (
        <InputForm
          htmlId="addCard"
          onChange={handleCardInputChange}
          onClose={() => setShowNewCardInput(false)}
          placeholder="Enter a title for this card..."
          onSubmit={handleCardSubmit}
          value=""
        />
      ) : (
        <button type="button" className={styles.addCard} onClick={() => setShowNewCardInput(true)}>
          Add a card
        </button>
      )}
    </div>
  );
}
export default CardCreator;
