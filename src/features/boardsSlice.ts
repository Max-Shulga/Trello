import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IBoard } from '../common/interfaces/IBoard.ts'
import api from '../api/request.ts'
import { IAllBoards } from '../common/interfaces/IAllBoards.ts'
import { RootState } from '../app/store.ts'

export interface IInitialState extends IAllBoards {
  isLoading: boolean
  hasError: boolean
}

const initialState: IInitialState = {
  id: 0,
  boards: [],
  isLoading: false,
  hasError: false,
}

export const loadAllBoards = createAsyncThunk('boards/loadBoards', async () => {
  const { boards }: IAllBoards = await api.get(`/board`)
  return boards
})

export const addBoard = createAsyncThunk('boards/addBoard', async (boardData: IBoard) => {
  const { data } = await api.post(`/board`, boardData)

  return data
})

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadAllBoards.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasError = false
        state.boards = action.payload || []
      })
      .addCase(addBoard.pending, state => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasError = false
        state.boards.push(action.payload)
      })
      .addCase(addBoard.rejected, state => {
        state.isLoading = false
        state.hasError = true
      })
  },
})

export const getBoards = (state: RootState) => state.boards.boards
export const isBoardsLoading = (state: RootState) => state.boards.isLoading
export default boardsSlice.reducer
