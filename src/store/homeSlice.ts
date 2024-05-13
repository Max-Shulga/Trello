import { createSlice } from '@reduxjs/toolkit';

import { IAllBoards } from '../common/interfaces/IHomeBoard';
import { ILoadingErrorState } from '../common/interfaces/ILoadingErrorState';
import { addBoard, getBoards } from './actions';

interface IInitialState extends IAllBoards, ILoadingErrorState {

}

const initialState: IInitialState = {
  boards: [],
  isLoading: false,
  hasError: false,
};

const homeSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.fulfilled, (state, action) => {
        const boards = action.payload ?? [];

        return {
          ...state,
          boards,
        };
      })
      .addCase(addBoard.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.boards.push(action.payload);
      })
      .addCase(addBoard.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default homeSlice.reducer;
