import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api/request';
import { IBoard } from '../common/interfaces/IBoard';
import { IHomeBoard, IHomeBoards } from '../common/interfaces/IHomeBoard.ts';
import { IChangeCardDataPayload } from '../common/types/IChangeCardDataPayload';
import { IChangeListDataPayload } from '../common/types/IChangeListDataPayload';
import ActionType from './common';
import { RootState } from './types.ts';

const getBoards = createAsyncThunk(
  ActionType.GET_BOARDS,
  async () => {
    const { boards }:IHomeBoards = await api.get('/board');

    return boards;
  },
);

const addBoard = createAsyncThunk(
  ActionType.ADD_BOARD,
  async (boardData: IHomeBoard) => {
    const response:IHomeBoard = await api.post('/board', boardData);
    const newBoardId = response.id;
    const { title, custom }:IBoard = await api.get(`/board/${newBoardId}`);

    return {
      id: newBoardId,
      title,
      custom,
    };
  },
);

const getBoardById = createAsyncThunk(
  ActionType.GET_BOARD_BY_ID,
  async (boardId: number) => {
    const response:IBoard = await api.get(`/board/${boardId}`);

    return { boardId, ...response };
  },
);

const changeBoardTitle = createAsyncThunk(
  ActionType.CHANGE_BOARD_TITLE,
  async (title: string, { getState }) => {
    const state = getState() as RootState;
    const boardId = state.board.id;
    await api.put(`/board/${boardId}`, { title });
  },
);

const deleteBoard = createAsyncThunk(
  ActionType.DELETE_BOARD,
  async (_, { getState }) => {
    const state = getState() as RootState;
    const boardId = state.board.id;
    await api.delete(`/board/${boardId}`);
  },
);

const addList = createAsyncThunk(
  ActionType.ADD_LIST,
  async (listData:IChangeListDataPayload, { getState }) => {
    const state = getState() as RootState;
    const boardId = state.board.id;
    await api.post(`/board/${boardId}/list`, { ...listData });
  },
);

const changeListData = createAsyncThunk(
  ActionType.CHANGE_LIST_DATA,
  async (listData:IChangeListDataPayload, { getState }) => {
    const state = getState() as RootState;
    const boardId = state.board.id;
    await api.put(`/board/${boardId}/list/${listData.id}`, { ...listData });
  },
);

const deleteList = createAsyncThunk(
  ActionType.DELETE_LIST,
  async (listId:number, { getState }) => {
    const state = getState() as RootState;
    const boardId = state.board.id;
    await api.delete(`/board/${boardId}/list/${listId}`);
  },
);

const addCard = createAsyncThunk(
  ActionType.ADD_CARD,
  async (cardData: IChangeCardDataPayload, { getState }) => {
    const state = getState() as RootState;
    const boardId = state.board.id;
    await api.post(`/board/${boardId}/card`, { ...cardData });
  },
);

const changeCardData = createAsyncThunk(
  ActionType.CHANGE_CARD_DATA,
  async (cardData:IChangeCardDataPayload, { getState }) => {
    const state = getState() as RootState;
    const boardId = state.board.id;
    await api.put(`/board/${boardId}/card/${cardData.id}`, { ...cardData });
  },
);

const deleteCard = createAsyncThunk(
  ActionType.DELETE_CARD,
  async (cardId:number, { getState }) => {
    const state = getState() as RootState;
    const boardId = state.board.id;
    await api.delete(`/board/${boardId}/card/${cardId}`);
  },
);

export {
  addBoard,
  addCard,
  addList,
  changeBoardTitle,
  changeCardData,
  changeListData,
  deleteBoard,
  deleteCard,
  deleteList,
  getBoardById,
  getBoards,
};
