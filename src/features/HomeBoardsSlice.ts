import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IAllBoards, IHomeBoard, IHomeBoardServerResponse } from '../common/interfaces/IHomeBoard.ts'
import api from '../api/request.ts'
import { RootState } from '../app/store.ts'
import { ILoadingErrorState } from '../common/interfaces/ILoadingErrorState.ts'
import { IBoard } from '../common/interfaces/IBoard.ts'


interface IInitialState extends IAllBoards,ILoadingErrorState {

}

const initialState: IInitialState = {
  boards: [],
  isLoading: false,
  hasError: false,
}

export const loadAllBoards = createAsyncThunk('boards/loadBoards', async () => {
  const { boards }: IAllBoards = await api.get(`/board`)
  return boards
})

export const addBoard = createAsyncThunk('boards/addBoard', async (boardData: IHomeBoard) => {
  const response: IHomeBoardServerResponse = await api.post(`/board`, boardData)
  const newBoardId = response.id
  const { title, custom }:IBoard = await api.get(`/board/${newBoardId}`)
  return {
    id: newBoardId,
    title,
    custom,
  }
})

export const homeBoardsSlice = createSlice({
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
export default homeBoardsSlice.reducer
