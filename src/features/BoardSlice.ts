import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBoard, IBoardWithId } from '../common/interfaces/IBoard.ts'
import { ILoadingErrorState } from '../common/interfaces/ILoadingErrorState.ts'
import api from '../api/request.ts'
import { RootState } from '../app/store.ts'
import { IHomeBoardServerResponse } from '../common/interfaces/IHomeBoard.ts'
import { IListServerResponse } from '../common/interfaces/IList.ts'

interface IInitialState extends IBoardWithId, ILoadingErrorState {}

const initialState: IInitialState = {
  id: NaN,
  title: '',
  custom: {
    color: 'transparent',
  },
  lists: [],
  isLoading: false,
  hasError: false,
  users: [
    {
      0: {
        id: 0,
        username: '',
      },
    },
  ],
}

export const loadBoard = createAsyncThunk(
  'board/loadBoard',
  async (id: number): Promise<IBoardWithId> => {
    const response: IBoard = await api.get(`/board/${id}`)
    return { id: id, ...response }
  },
)
export const changeBoardTitle = createAsyncThunk(
  'board/changeBoardTitle',
  async ({ id, title }: IHomeBoardServerResponse): Promise<string> => {
    await api.put(`/board/${id}`, { title: title })
    const response: IBoard = await api.get(`/board/${id}`)
    return response.title
  },
)
export const addList = createAsyncThunk(
  'board/addList',
  async ({
    id,
    title,
    position,
  }: {
    id: number
    title: string
    position: number
  }): Promise<IListServerResponse[]> => {
    await api.post(`/board/${id}/list`, { title: title, position: position })

    const response: IBoard = await api.get(`/board/${id}`)
    return response.lists
  },
)

export const addNewCard = createAsyncThunk(
  'board/list/card/addCard',
  async ({
    boardID,
    list_id,
    title,
    position,
  }: {
    boardID: number
    list_id: number
    title: string
    position: number
  }) => {
    await api.post(`/board/${boardID}/card`, {
      title: title,
      list_id: list_id,
      position: position,
    })
    const response: IBoard = await api.get(`/board/${boardID}`)
    return response.lists
  },
)

export const changeListTitle = createAsyncThunk(
  'board/list/changeListTitle',
  async ({
    boardId,
    listId,
    title,
    position,
  }: {
    boardId: number
    listId: number
    title: string
    position: number
  }) => {
    await api.put(`/board/${boardId}/list/${listId}`, {
      id: listId,
      title: title,
      position: position,
    })
    const response: IBoard = await api.get(`/board/${boardId}`)
    return response.lists
  },
)

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadBoard.fulfilled, (state, action: PayloadAction<IBoardWithId>) => {
      const { title, custom, lists, users, id } = action.payload
      state.id = id
      state.isLoading = false
      state.hasError = false
      state.title = title
      state.custom.color = custom.color
      state.lists = lists
      state.users = users
    })
    builder.addCase(changeBoardTitle.fulfilled, (state, action) => {
      state.isLoading = false
      state.hasError = false
      state.title = action.payload
    })

    builder.addCase(addList.fulfilled, (state, action) => {
      state.isLoading = false
      state.hasError = false
      state.lists = action.payload
    })
    builder.addCase(changeListTitle.fulfilled, (state, action) => {
      state.isLoading = false
      state.hasError = false
      state.lists = action.payload
    })
    builder.addCase(addNewCard.fulfilled,(state,action)=>{
      state.isLoading = false
      state.hasError = false
      state.lists = action.payload
    })
  },
})

export const getBoard = (state: RootState) => state.board

export default boardSlice.reducer
