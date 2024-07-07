import { unwrapResult } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Outlet, useParams } from 'react-router-dom';

import handleApiError from '../../api/handleApiError';
import { IChangeCardPosition } from '../../common/interfaces/IChangeCardPosition';
import { IList } from '../../common/interfaces/IList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeCardPosition, getBoardById } from '../../store/reducers/actions';
import Loader from '../../ui/Loader/Loader';
import updateCardsData from '../../utils/updateCardsData';
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
  const createNewListText = lists.length > 0 ? 'Add another list' : 'Add a list';
  useEffect(() => {
    dispatch(getBoardById(id))
      .then(unwrapResult)
      .catch((e:AxiosError):void => {
        handleApiError(e);
      });
  }, [id, dispatch]);

  const onDragEnd = (result: DropResult):void => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId
      && destination.index === source.index) {
      return;
    }
    const sourceList = lists.find((list) => list.id === +source.droppableId);
    const destinationList = lists.find((list) => list.id === +destination.droppableId);
    const movedCardData:IChangeCardPosition = {
      id: +draggableId,
      list_id: sourceList!.id,
      position: +destination.index,
    };

    const cardsToUpdate = updateCardsData(
      sourceList!,
      destinationList!,
      movedCardData,
    );
    dispatch(changeCardPosition({
      cardsData: cardsToUpdate,
      boardId: Number(id),
    }));
  };

  return (
    <div style={{ background: custom.color }} className={styles.boardContainer}>
      {isLoading && <Loader />}
      <BoardHeader title={title} />
      <section className={styles.listWrapper}>
        <ul className={styles.ListContainer}>
          <DragDropContext onDragEnd={onDragEnd}>
            {lists.map((list: IList) => (
              <List key={list.id} list={list} />
            ))}
          </DragDropContext>
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
