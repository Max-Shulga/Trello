import React, { ChangeEvent, useState } from 'react';

import { IList } from '../../../../common/interfaces/IList';
import { IChangeCardDataPayload } from '../../../../common/types/IChangeCardDataPayload';
import { IChangeListDataPayload } from '../../../../common/types/IChangeListDataPayload';
import InputForm from '../../../../components/InputForm/InputForm';
import { addCard, changeListData, deleteList } from '../../../../store/actions';
import { AppDispatch } from '../../../../store/store';
import Card from '../Card/Card';
import styles from './List.module.scss';

interface ListProps {
  list: IList
  dispatch: AppDispatch
  boardId:number
}

function List(props: ListProps) :React.JSX.Element {
  const [showNewTitleInput, setShowNewTitleInput] = useState(false);
  const [showNewCardInput, setShowNewCardInput] = useState(false);
  const { list, dispatch, boardId } = props;
  const position = list.cards.length;
  const [newListTitle, setNewListTitle] = useState<IChangeListDataPayload>({
    title: '',
    position: list.position,
    id: list.id,
  });

  const [newCard, setNewCard] = useState<IChangeCardDataPayload>({
    list_id: list.id,
    title: '',
    position,
  });

  const handleNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setNewListTitle({
      ...newListTitle,
      title: newTitle,
    });
  };

  const handleTitleSubmit = ():void => {
    setShowNewTitleInput(false);

    if (newListTitle.title) dispatch(changeListData({ listData: newListTitle, boardId }));
  };

  const handleCardInputChange = (e: ChangeEvent<HTMLInputElement>):void => {
    const newCardValue = e.target.value;
    setNewCard({
      ...newCard,
      title: newCardValue,
    });
  };
  const handleCardSubmit = ():void => {
    setShowNewCardInput(false);

    if (newCard.title) dispatch(addCard({ cardData: newCard, boardId }));
  };

  const handleDeleteList = ():void => {
    dispatch(deleteList({ listId: list.id, boardId }));
  };

  return (
    <li className={styles.listEl}>
      <div className={styles.cardContentContainer} key={list.id}>
        <div className={styles.listContent}>
          <div className={styles.listHeader}>
            {showNewTitleInput ? (
              <InputForm
                htmlId="changeListTitle"
                onChange={handleNewTitleChange}
                value={list.title}
                onSubmit={handleTitleSubmit}
              />
            ) : (
              <h2 onClick={() => setShowNewTitleInput(true)}>{list.title}</h2>
            )}
            <button onClick={handleDeleteList} className={styles.cardOptionsButton}>
              del
            </button>
          </div>
          <ul className={styles.cardsContainer}>
            {showNewCardInput ? (
              <InputForm
                htmlId="addCard"
                onChange={handleCardInputChange}
                placeholder="Enter a title for this card..."
                onSubmit={handleCardSubmit}
              />
            ) : (
              <button className={styles.addCard} onClick={() => setShowNewCardInput(true)}>
                Add a card
              </button>
            )}
            {list.cards.map((card) => (
              <Card key={card.id} dispatch={dispatch} {...card} list_id={list.id} boardId={boardId} />
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
export default List;
