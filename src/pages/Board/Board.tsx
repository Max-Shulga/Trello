import {useAppSelector} from "../../app/hooks.ts";
import List from "./components/List/List.tsx";
import styles from './Board.module.scss'
export const Board = () => {

    const title = useAppSelector(state => state.allBoards.boards[0].title);
    const lists = useAppSelector(state => state.allBoards.boards)

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>

                {lists.map(board => {
                    return <List key={board.id} cards={board.cards}/>
                })}

        </div>
    )
}