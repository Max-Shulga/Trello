import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'
import { getBoards, isBoardsLoading, loadAllBoards } from '../../features/HomeBoardsSlice.ts'
import { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import BoardIcon from './components/BoardIcon/BoardIcon.tsx'
import BoardForm from './components/BoardForm/BoardForm.tsx'
import { IHomeBoardServerResponse } from '../../common/interfaces/IHomeBoard.ts'
import { unwrapResult } from '@reduxjs/toolkit'
import { handleApiError } from '../../api/handleApiError.ts'

export default function Home() {
  const [isNewBoardVisible, setIsNewBoardVisible] = useState(false)
  const dispatch = useAppDispatch()
  const boards = useAppSelector(getBoards)
  const isLoading = useAppSelector(isBoardsLoading)

  useEffect(() => {
    dispatch(loadAllBoards())
      .then(unwrapResult)
      .catch(e => {
        handleApiError(e)
      })
  }, [dispatch])

  const toggleNewBoardVisibility = () => {
    setIsNewBoardVisible(!isNewBoardVisible)
  }

  if (isLoading)
    return <img className={styles.loading} src={'/assets/icon-spinner.gif'} alt='loading spinner' />

  return (
    <div className={styles.homePageContainer}>
      <h3>Your workspaces</h3>
      <div>
        <ul className={styles.iconsList}>
          {boards.map((board: IHomeBoardServerResponse) => (
            <BoardIcon key={board.id} {...board} />
          ))}
          <li className={styles.addNewBoardButton} onClick={toggleNewBoardVisibility}>
            <div>Create new board</div>
          </li>
          {isNewBoardVisible && <BoardForm onClick={toggleNewBoardVisibility} dispatch={dispatch} />}
        </ul>
      </div>
    </div>
  )
}
