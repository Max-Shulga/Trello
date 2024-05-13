import { unwrapResult } from '@reduxjs/toolkit';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { handleApiError } from '../../api/handleApiError';
import { patternBoardTitle } from '../../common/constants/patternBoardTitle';
import { IList } from '../../common/interfaces/IList';
import InputForm from '../../components/InputForm/InputForm';
import { changeBoardTitle, deleteBoard, getBoardById } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './Board.module.scss';
import List from './components/List/List';
import NewListCreator from './components/NewListCreator/NewListCreator';

function Board():React.JSX.Element {
  const { id: idString } = useParams<string>() as {
    id: string
  };
  const id = +idString;
  const {
    title, lists, custom, isLoading,
  } = useAppSelector((state) => state.board);
  const [showListCreateForm, setShowListCreateForm] = useState(false);
  const [showNewTitleInput, setShowNewTitleInput] = useState(false);
  const dispatch = useAppDispatch();
  const [newTitle, setNewTitle] = useState(title);
  const createNewListText = lists.length > 0 ? 'Add another list' : 'Add a list';
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBoardById(id))
      .then(unwrapResult)
      .catch((e) => {
        handleApiError(e);
      });
  }, [id, dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setNewTitle(e.target.value);
  };

  const handleSubmit = ():void => {
    if (newTitle.trim()) dispatch(changeBoardTitle({ title: newTitle, boardId: id }));

    setShowNewTitleInput(false);
  };

  const handleDeleteBoard = ():void => {
    dispatch(deleteBoard(id));
    navigate('/');
  };

  if (isLoading) {
    return <img className={styles.loading} src="/assets/icon-spinner.gif" alt="loading spinner" />;
  }

  return (
    <div style={{ background: custom.color }} className={styles.boardContainer}>
      <div className={styles.headerContainer}>
        <div onClick={() => setShowNewTitleInput(true)} className={styles.title}>
          {showNewTitleInput ? (
            <InputForm
              htmlId="changeBoardName"
              onChange={handleInputChange}
              value={title}
              onSubmit={handleSubmit}
              validationPattern={patternBoardTitle}
            />
          ) : (
            title
          )}
        </div>
        <button onClick={handleDeleteBoard} className={styles.delBoardButton}>
          del
        </button>
      </div>
      <ul className={styles.cardsListContainer}>
        {lists.map((list:IList) => (
          <List key={list.id} list={list} dispatch={dispatch} boardId={id} />
        ))}
        <li className={styles.addCard}>
          {showListCreateForm ? (
            <NewListCreator
              position={lists.length + 1}
              id={id}
              setShowCreateForm={setShowListCreateForm}
            />
          ) : (
            <button
              className={styles.showCreateMenuButton}
              onClick={() => setShowListCreateForm(true)}
            >
              {createNewListText}
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
export default Board;
