import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBoard, IBoardWithId } from '../common/interfaces/IBoard.ts'
import { ILoadingErrorState } from '../common/interfaces/ILoadingErrorState.ts'
import api from '../api/request.ts'
import { RootState } from '../app/store.ts'
import { IChangeListDataPayload } from '../common/types/IChangeListDataPayload.ts'
import { IChangeCardDataPayload } from '../common/types/IChangeCardDataPayload.ts'

interface IInitialState extends IBoardWithId, ILoadingErrorState {}

const initialState: IInitialState = {
  id: 0,
  title: '',
  custom: {
    color: 'transparent',
  },
  lists: [],
  users: [
    {
      0: {
        id: 0,
        username: '',
      },
    },
  ],
  isLoading: false,
  hasError: false,
}

export const loadBoard = createAsyncThunk(
  'board/loadBoard',
  async (id: number): Promise<IBoardWithId> => {
    const response: IBoard = await api.get(`/board/${id}`)
    return { id: id, ...response }
  },
)
/*
Boards
*/
export const changeBoardTitle = createAsyncThunk(
  'board/changeBoardTitle',
  async (title: string, { getState }) => {
    const currentState: RootState = getState() as RootState
    const { id } = currentState.board
    await api.put(`/board/${id}`, { title: title })
    const response: IBoard = await api.get(`/board/${id}`)
    return response.title
  },
)
export const deleteBoard = createAsyncThunk(
  'board/list/changeListData',
  async (_, { getState }) => {
    console.log(123)
    const currentState: RootState = getState() as RootState
    const { id } = currentState.board
    await api.delete(`/board/${id}`)
  },
)
/*
 * Lists
 */
export const addList = createAsyncThunk(
  'board/addList',
  async (listData: IChangeListDataPayload, { getState }) => {
    const currentState: RootState = getState() as RootState
    const { id } = currentState.board

    await api.post(`/board/${id}/list`, { ...listData })
    const response: IBoard = await api.get(`/board/${id}`)
    return response.lists
  },
)
export const changeListData = createAsyncThunk(
  'board/list/changeListData',
  async (listData: IChangeListDataPayload, { getState }) => {
    const currentState: RootState = getState() as RootState
    const { id } = currentState.board
    const { id: listId } = listData
    await api.put(`/board/${id}/list/${listId}`, { ...listData })
    const response: IBoard = await api.get(`/board/${id}`)
    return response.lists
  },
)
export const deleteList = createAsyncThunk(
  'board/list/changeListData',
  async (listId: number, { getState }) => {
    const currentState: RootState = getState() as RootState
    const { id } = currentState.board
    await api.delete(`/board/${id}/list/${listId}`)
    const response: IBoard = await api.get(`/board/${id}`)
    return response.lists
  },
)
/*
 * Cards
 */
export const addCard = createAsyncThunk(
  'board/list/card/addCard',
  async (cardData: IChangeCardDataPayload, { getState }) => {
    const currentState: RootState = getState() as RootState
    const { id } = currentState.board
    await api.post(`/board/${id}/card`, { ...cardData })
    const response: IBoard = await api.get(`/board/${id}`)
    return response.lists
  },
)
export const changeCardData = createAsyncThunk(
  'board/list/card/changeCardData',
  async (cardData: IChangeCardDataPayload, { getState }) => {
    const currentState: RootState = getState() as RootState
    const { id } = currentState.board
    await api.put(`/board/${id}/card/${cardData.id}`, { ...cardData })
    const response: IBoard = await api.get(`/board/${id}`)
    return response.lists
  },
)
export const deleteCard = createAsyncThunk(
  'board/list/changeListData',
  async (cardId: number, { getState }) => {
    const currentState: RootState = getState() as RootState
    const { id } = currentState.board
    await api.delete(`/board/${id}/card/${cardId}`)
    const response: IBoard = await api.get(`/board/${id}`)
    return response.lists
  },
)
const handleFulfilledCase = <T>(state: IInitialState, action: PayloadAction<T>) => {
  return {
    ...state,
    isLoading: false,
    hasError: false,
    lists: action.payload,
  }
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasError = false
        return {
          ...state,
          ...action.payload,
        }
      })
      .addCase(changeBoardTitle.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasError = false
        state.title = action.payload
      })
      .addCase(addList.fulfilled, handleFulfilledCase)
      .addCase(changeListData.fulfilled, handleFulfilledCase)
      .addCase(addCard.fulfilled, handleFulfilledCase)
      .addCase(changeCardData.fulfilled, handleFulfilledCase)
  },
})

export const getBoard = (state: RootState) => state.board

export default boardSlice.reducer
