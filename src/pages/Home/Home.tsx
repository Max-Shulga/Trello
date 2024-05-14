import { unwrapResult } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

import { handleApiError } from '../../api/handleApiError';
import { IHomeBoard } from '../../common/interfaces/IHomeBoard';
import { getBoards } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BoardForm from './components/BoardForm/BoardForm';
import BoardIcon from './components/BoardIcon/BoardIcon';
import styles from './Home.module.scss';

function Home():React.JSX.Element {
  const [isNewBoardVisible, setIsNewBoardVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useAppSelector((state) => state.home);

  useEffect(() => {
    dispatch(getBoards())
      .then(unwrapResult)
      .catch((e:AxiosError) => {
        handleApiError(e);
      });
  }, [dispatch]);

  const toggleNewBoardVisibility = ():void => {
    setIsNewBoardVisible(!isNewBoardVisible);
  };

  if (isLoading) return <img className={styles.loading} src="/assets/icon-spinner.gif" alt="loading spinner" />;

  return (
    <div className={styles.homePageContainer}>
      <h3>Your workspaces</h3>
      <div>
        <ul className={styles.iconsList}>
          {boards.map((board: IHomeBoard) => (
            <BoardIcon key={board.id} {...board} />
          ))}
          <button type="button" className={styles.addNewBoardButton} onClick={toggleNewBoardVisibility}>
            <div>Create new board</div>
          </button>
          {isNewBoardVisible && <BoardForm onClick={toggleNewBoardVisibility} />}
        </ul>
      </div>
    </div>
  );
}
export default Home;
