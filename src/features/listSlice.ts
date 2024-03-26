import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IList } from '../common/interfaces/IList.ts'
import { ILoadingErrorState } from '../common/interfaces/ILoadingErrorState.ts'

interface IInitialState extends IList, ILoadingErrorState {}

const initialState: IInitialState = {
  title: '',
  position: 1,
  isLoading: false,
  hasError: false,
}
export const createList = createAsyncThunk('board/addList', async () => {})

const listSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
})
export default listSlice.reducer
