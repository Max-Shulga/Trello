import { useAppSelector } from '../../app/hooks.ts'
import List from './components/List/List.tsx'
import styles from './Board.module.scss'
import { useParams } from 'react-router-dom'

export const Board = () => {
  const {id} = useParams()
  const board = useAppSelector(state =>
    state.allBoards.boards.filter(board => {
      return board.id === Number(id)
    }),
  )[0]
    console.log(board)
  const renderBoardContent = () => {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{board.title}</h1>
        return <List key={board.id} lists={board.lists} />
      </div>
    )
  }
  return <>{board ? renderBoardContent() : <div>No board</div>}</>
}
