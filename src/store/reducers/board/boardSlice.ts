/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import emptyBoard from '../../../common/factories/emptyBoard';
import emptyCard from '../../../common/factories/emptyCard';
import emptyList from '../../../common/factories/emptyList';
import { IBoard } from '../../../common/interfaces/IBoard';
import { ICard } from '../../../common/interfaces/ICard';
import { IList } from '../../../common/interfaces/IList';
import {
  addCard,
  addList,
  changeBoardTitle, changeCardData,
  changeCardPosition,
  changeListData, changeListPosition,
  deleteBoard, deleteCard, deleteList,
  getBoardById,
  getOtherBoardById,
} from '../actions';

interface IInitialState {
  board:IBoard
  error?: AxiosError
  isLoading:boolean
  selectedCard: ICard
  selectedList: IList
  otherBoard:IBoard

}

const initialState: IInitialState = {
  board: emptyBoard,
  isLoading: true,
  selectedCard: emptyCard,
  selectedList: emptyList,
  otherBoard: emptyBoard,
};
const thunks = [getBoardById,
  getOtherBoardById,
  changeBoardTitle,
  deleteBoard,
  addList,
  changeListData,
  deleteList,
  changeListPosition,
  addCard,
  changeCardData,
  deleteCard,
  changeCardPosition];

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getCardById: (state, { payload }) => {
      state.board.lists.forEach((list) => {
        const searchCard = list.cards.find((card) => card.id === payload);

        if (searchCard) {
          state.selectedCard = searchCard;
          state.selectedList = list;
        }
      });
    },

    resetSelectedCardData: (state) => {
      state.selectedCard = emptyCard;
      state.selectedList = emptyList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardById.fulfilled, (state, { payload }) => {
        const changedList = payload.lists.find((list) => list.id === state.selectedList.id);

        if (changedList) {
          state.selectedList = changedList;
          const changedCard = changedList.cards.find((card) => card.id === state.selectedCard.id);

          if (changedCard) {
            state.selectedCard = changedCard;
          }
        }
        state.board = payload;
        state.board.boardId = payload.boardId;
        state.isLoading = false;
      })
      .addCase(getOtherBoardById.fulfilled, (state, { payload }) => {
        state.otherBoard = payload;
        state.otherBoard.boardId = payload.boardId;
        state.isLoading = false;
      });
    thunks.forEach((thunk) => {
      builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
      });
    });
  },
});
export const {
  getCardById,
  resetSelectedCardData,
} = boardSlice.actions;
export default boardSlice.reducer;
