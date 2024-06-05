import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IBoard } from '../../../common/interfaces/IBoard';
import { getBoardById } from '../actions';

interface IInitialState extends IBoard {
  error?: AxiosError
  isLoading:boolean
}

const initialState: IInitialState = {
  boardId: 0,
  title: '',
  custom: {
    color: 'transparent',
  },
  lists: [],
  users: [{}],
  isLoading: true,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardById.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        isLoading: false,
      }));
  },
});
export default boardSlice.reducer;
