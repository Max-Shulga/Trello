import { unwrapResult } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';

import { handleApiError } from '../../api/handleApiError';
import iconSpinner from '../../assets/iconSpinner.gif';
import { IHomeBoard } from '../../common/interfaces/IHomeBoard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoards } from '../../store/reducers/actions';
import BoardIcon from './components/BoardIcon/BoardIcon';
import NewBoardControl from './components/NewBoardControl/NewBoardControl';
import styles from './Home.module.scss';

function Home():React.JSX.Element {
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useAppSelector((state) => state.home);

  useEffect(() => {
    dispatch(getBoards())
      .then(unwrapResult)
      .catch((e:AxiosError) => {
        handleApiError(e);
      });
  }, [dispatch]);

  if (isLoading) return <img className={styles.loading} src={iconSpinner} alt="loading spinner" />;

  return (
    <div className={styles.homePageContainer}>
      <h3>Your workspaces</h3>
      <div>
        <ul className={styles.iconsList}>
          {boards.map((board: IHomeBoard) => (
            <BoardIcon key={board.id} {...board} />
          ))}
          <NewBoardControl />
        </ul>
      </div>
    </div>
  );
}
export default Home;
