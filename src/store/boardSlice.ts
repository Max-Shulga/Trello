import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IBoardWithId } from '../common/interfaces/IBoard';
import { ILoadingErrorState } from '../common/interfaces/ILoadingErrorState';
import {
  addCard, addList, changeBoardTitle, changeCardData, changeListData, getBoardById,
} from './actions';

interface IInitialState extends IBoardWithId, ILoadingErrorState {
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

const handleFulfilledCase = <T>(state: IInitialState, action: PayloadAction<T>) => ({
  ...state,
  isLoading: false,
  lists: action.payload,
});

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
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
      .addCase(changeBoardTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.title = action.payload;
      })
      .addCase(addList.fulfilled, handleFulfilledCase)
      .addCase(changeListData.fulfilled, handleFulfilledCase)
      .addCase(addCard.fulfilled, handleFulfilledCase)
      .addCase(changeCardData.fulfilled, handleFulfilledCase)
      .addCase(getBoardById.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default boardSlice.reducer;
