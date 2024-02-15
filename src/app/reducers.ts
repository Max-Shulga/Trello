import {combineReducers} from "redux";
import boardSlice, {IBoard} from "../features/boardSlice.ts";
import cardSlice, {ICard} from "../features/cardSlice.ts";
import allBoardsSlice, {IAllBoards} from "../features/allBoardsSlice.ts";


const initialTitle = "Моя тестова дошка"

const initialBoard: IBoard = {
    id: 0,
    title: initialTitle,
    cards: [
        {
            id: 1,
            title: "Плани",
            cases: [
                {id: 1, title: "помити кота"},
                {id: 2, title: "приготувати суп"},
                {id: 3, title: "сходити в магазин"}
            ]
        },
        {
            id: 2,
            title: "В процесі",
            cases: [
                {id: 4, title: "подивитися серіал"}
            ]
        },
        {
            id: 3,
            title: "Зроблено",
            cases: [
                {id: 5, title: "зробити домашку"},
                {id: 6, title: "погуляти з собакой"}
            ]
        }
    ]
}

export interface IInitialState {
    allBoards: IAllBoards,
    board: IBoard
    card: ICard
}

const initialState: IInitialState = {
    allBoards: {
        id: 0,
        boards: [initialBoard]
    },
    board: initialBoard,
    card: { id: 0, title: '', cases: [] }
};

// export interface IRootReducer {
//     allBoards: IAllBoards
//     board: IBoard
//     card: ICard
// }

const rootReducer = combineReducers({
    allBoards: allBoardsSlice,
    board: boardSlice,
    card: cardSlice
})

export {rootReducer, initialState}
