import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IBoard } from '../common/interfaces/IBoard.ts';
import { ILoadingErrorState } from '../common/interfaces/ILoadingErrorState';
import { getBoardById } from './actions';

interface IInitialState extends IBoard, ILoadingErrorState {
  error?: AxiosError
}

const initialState: IInitialState = {
  id: 0,
  title: '',
  custom: {
    color: 'transparent',
  },
  lists: [],
  users: [{}],
  isLoading: false,
  hasError: false,

};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardId: (state, action) => ({
      ...state,
      id: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;

        return {
          ...state,
          ...action.payload,
        };
      })

      .addCase(getBoardById.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});
export const { setBoardId } = boardSlice.actions;
export default boardSlice.reducer;
