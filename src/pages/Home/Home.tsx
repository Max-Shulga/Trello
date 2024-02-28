import { useAppSelector } from '../../app/hooks.ts'
import BoardIcon from './components/BoardIcon/BoardIcon.tsx'
import styles from './Home.module.scss'

export default function Home() {
  const boardIcons = useAppSelector(state => state.allBoards.boardsIcons)

  return (
    <div className={styles.homePageContainer}>
      <h1>My Boards</h1>
      <div className={styles.boardIconsContainer}>
        {boardIcons.map(boardIcon => (
          <BoardIcon key={boardIcon.id} boardIcon={boardIcon} />
        ))}
        <button className={styles.addNewBoardButton}>+</button>
      </div>
    </div>
  )
}
