import {IBoard} from "./boardSlice.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IAllBoards {
    id: number,
    boards: IBoard[]
}

const initialState: IAllBoards = {
    id: 0,
    boards: []
}

const allBoardsSlice = createSlice({
    name: 'allBoards',
    initialState,
    reducers: {
        addBoard: (state, action: PayloadAction<IBoard>) => {
            state.boards.push(action.payload)
        },
        removeBoard: (state, action: PayloadAction<{ id: number }>) => {
            state.boards = state.boards.filter(board => board.id !== action.payload.id)
        }
    }
})
export const {addBoard,removeBoard} = allBoardsSlice.actions
export default allBoardsSlice.reducer