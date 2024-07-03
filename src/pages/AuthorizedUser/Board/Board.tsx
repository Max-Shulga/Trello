import { unwrapResult } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import handleApiError from '../../../api/handleApiError';
import iconSpinner from '../../../assets/iconSpinner.gif';
import { ICard } from '../../../common/interfaces/ICard';
import { IList } from '../../../common/interfaces/IList';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { changeCardPosition, getBoardById } from '../../../store/reducers/actions';
import { getUpdatedCardsData } from '../../../utils/getUpdatedCardsData';
import styles from './Board.module.scss';
import BoardHeader from './components/BoardHeader/BoardHeader';
import List from './components/List/List';
import NewListCreator from './components/NewListCreator/NewListCreator';

function Board():React.JSX.Element {
  const { id: idString } = useParams();
  const id = Number(idString);
  const { lists, custom, title } = useAppSelector((state) => state.board.board);
  const { isLoading } = useAppSelector((state) => state.board);
  const [showListCreateForm, setShowListCreateForm] = useState(false);
  const dispatch = useAppDispatch();
  const [currentList, setCurrentList] = useState<IList>();
  const [currentCard, setCurrentCard] = useState<ICard>();

  const createNewListText = lists.length > 0 ? 'Add another list' : 'Add a list';
  useEffect(() => {
    dispatch(getBoardById(id))
      .then(unwrapResult)
      .catch((e:AxiosError):void => {
        handleApiError(e);
      });
  }, [id, dispatch]);

  const onDragStartHandler = (list:IList, card:ICard): void => {
    if (list) setCurrentList(list);

    if (card) setCurrentCard(card);
  };
  const onDragOverHandler = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault();
  };
  const onDragDropHandler = (e: React.DragEvent<HTMLLIElement>, list:IList, card:ICard): void => {
    e.preventDefault();
    e.stopPropagation();

    if (list.id === currentList!.id && card.position === currentCard!.position) {
      return;
    }
    const cardsDataToUpdate = getUpdatedCardsData(
      currentList!,
      list,
      {
        id: currentCard!.id,
        position: card.position + 1,
        list_id: list.id,
      },
    );
    dispatch(changeCardPosition({
      cardsData: cardsDataToUpdate,
      boardId: Number(id),
    }));
  };
  const handleEmptyListDrop = (e: React.DragEvent<HTMLLIElement>, list:IList):void => {
    e.preventDefault();
    const cardsDataToUpdate = getUpdatedCardsData(
      currentList!,
      list,
      {
        id: currentCard!.id,
        position: 1,
        list_id: list.id,
      },
    );
    dispatch(changeCardPosition({
      cardsData: cardsDataToUpdate,
      boardId: Number(id),
    }));
  };

  if (isLoading) {
    return <img className={styles.loading} src={iconSpinner} alt="loading spinner" />;
  }

  return (
    <div style={{ background: custom.color }} className={styles.boardContainer}>
      <BoardHeader title={title} />
      <section className={styles.listWrapper}>
        <ul className={styles.ListContainer}>
          {lists.map((list:IList) => (
            <List
              key={list.id}
              list={list}
              onDragOver={onDragOverHandler}
              onDragStart={onDragStartHandler}
              onDragDrop={onDragDropHandler}
              onEmptyListDrop={handleEmptyListDrop}
            />
          ))}
          <li className={styles.addCard}>
            {showListCreateForm ? (
              <NewListCreator
                position={lists.length + 1}
                onClick={setShowListCreateForm}
              />
            ) : (
              <button
                type="button"
                className={styles.showCreateMenuButton}
                onClick={() => setShowListCreateForm(true)}
              >
                {createNewListText}
              </button>
            )}
          </li>
        </ul>
      </section>
      <Outlet />
    </div>
  );
}
export default Board;
