import { unwrapResult } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { handleApiError } from '../../api/handleApiError';
import iconSpinner from '../../assets/iconSpinner.gif';
import { IList } from '../../common/interfaces/IList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoardById } from '../../store/reducers/actions';
import styles from './Board.module.scss';
import BoardHeader from './components/BoardHeader/BoardHeader';
import List from './components/List/List';
import NewListCreator from './components/NewListCreator/NewListCreator';

function Board():React.JSX.Element {
  const { id: idString } = useParams();
  const id = Number(idString);
  const {
    lists, custom, isLoading, title,
  } = useAppSelector((state) => state.board);
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

  if (isLoading) {
    return <img className={styles.loading} src={iconSpinner} alt="loading spinner" />;
  }

  return (
    <div style={{ background: custom.color }} className={styles.boardContainer}>
      <BoardHeader title={title} />
      <section className={styles.listWrapper}>
        <ul className={styles.ListContainer}>
          {lists.map((list:IList) => (
            <List key={list.id} list={list} />
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
    </div>
  );
}
export default Board;
