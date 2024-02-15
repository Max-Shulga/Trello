import {useAppSelector} from "../../app/hooks.ts";
import List from "./components/List/List.tsx";


export const Board = () => {

    const title = useAppSelector(state => state.allBoards.boards[0].title);
    const lists = useAppSelector(state => state.allBoards.boards)

    return (
        <>
            <h1>{title}</h1>

                {lists.map(board => {

                    return <List key={board.id} cards={board.cards}/>
                })}

        </>
    )
}