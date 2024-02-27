import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAllBoards } from '../common/interfaces/IAllBoards.ts'
import { IBoard } from '../common/interfaces/IBoard.ts'

const initialState: IAllBoards = {
  id: 0,
  boards: [],
}

const allBoardsSlice = createSlice({
  name: 'allBoards',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<IBoard>) => {
      state.boards.push(action.payload)
    },
    removeBoard: (state, action: PayloadAction<{ id: number }>) => {
      state.boards = state.boards.filter(
        board => board.id !== action.payload.id,
      )
    },
  },
})

export const { addBoard, removeBoard } = allBoardsSlice.actions
export default allBoardsSlice.reducer
