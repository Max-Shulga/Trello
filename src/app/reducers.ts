import { combineReducers } from 'redux'
import boardSlice from '../features/boardSlice.ts'
import cardSlice from '../features/ListSlice.ts'
import allBoardsSlice from '../features/allBoardsSlice.ts'
import themeToggleSlice from '../features/themeToggleSlice.ts'
import { IBoard } from '../common/interfaces/IBoard.ts'
import { IAllBoards } from '../common/interfaces/IAllBoards.ts'
import { IList } from '../common/interfaces/IList.ts'
import { IBoardIcon } from '../common/interfaces/IBoardIcon.ts'

const initialTitle = 'Моя тестова дошка'

const initialBoard: IBoard = {
    id: 0,
    title: initialTitle,
    lists: [
        {
            id: 1,
            title: 'Плани',
            cards: [
                { id: 1, title: 'помити кота' },
                { id: 2, title: 'приготувати суп' },
                { id: 3, title: 'сходити в магазин' },
            ],
        },
        {
            id: 2,
            title: 'В процесі',
            cards: [{ id: 4, title: 'подивитися серіал' }],
        },
        {
            id: 3,
            title: 'Зроблено',
            cards: [
                { id: 5, title: 'зробити домашку' },
                { id: 6, title: 'погуляти з собакой' },
            ],
        },
    ],
}
const initialBoardIcons: IBoardIcon[] = [
    { id: 1, title: 'покупки', custom: { background: 'red' } },
    { id: 2, title: 'підготовка до весілля', custom: { background: 'green' } },
    { id: 3, title: 'розробка інтернет-магазину', custom: { background: 'blue' } },
    { id: 4, title: 'курс по просуванню у соцмережах', custom: { background: 'grey' } },
]

export interface IInitialState {
    allBoards: IAllBoards
    board: IBoard
    list: IList
}

const initialState: IInitialState = {
    allBoards: {
        id: 0,
        boards: [initialBoard],
        boardsIcons:initialBoardIcons,
    },
    board: initialBoard,
    list: { id: 0, title: '', cards: [] },
}

// export interface IRootReducer {
//     allBoards: IAllBoards
//     board: IBoard
//     list: IList
// }

const rootReducer = combineReducers({
    allBoards: allBoardsSlice,
    board: boardSlice,
    list: cardSlice,
    card: cardSlice,
    themeToggle: themeToggleSlice,
})

export { rootReducer, initialState }
