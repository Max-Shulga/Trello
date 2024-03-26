import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'
import {  getBoards, isBoardsLoading, loadAllBoards } from '../../features/HomeBoardsSlice.ts'
import { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import BoardIcon from './components/BoardIcon/BoardIcon.tsx'
import NewBoardCreator from './components/NewBoardCreator/NewBoardCreator.tsx'
import { IHomeBoardServerResponse } from '../../common/interfaces/IHomeBoard.ts'

export default function Home() {
  const [showNewBoardCreator, setShowNewBoardCreator] = useState(false)
  const dispatch = useAppDispatch()
  const boards = useAppSelector(getBoards)
  const isLoading = useAppSelector(isBoardsLoading)

  useEffect(() => {
    dispatch(loadAllBoards())
  }, [])

  const handleClick = () => {
    setShowNewBoardCreator(!showNewBoardCreator)
  }
  if (isLoading) return <div>Loading...</div>

  return (
    <div className={styles.homePageContainer}>
      <h3>YOUR WORKSPACES</h3>
      <div className={styles.boardIconsContainer}>
        <ul className={styles.ul}>
          {boards.map((board: IHomeBoardServerResponse) => (
              <BoardIcon key={board.id}  {...board}/>
          ))}
          <li className={styles.addNewBoardButton} onClick={handleClick}>
            <div>Create new board</div>
          </li>
          {showNewBoardCreator && <NewBoardCreator onClick={handleClick}/>}
        </ul>

      </div>
    </div>
  )
}
