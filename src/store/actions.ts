import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api/request';
import { IBoard } from '../common/interfaces/IBoard';
import { IAllBoards, IHomeBoard, IHomeBoardServerResponse } from '../common/interfaces/IHomeBoard';
import { IChangeCardDataPayload } from '../common/types/IChangeCardDataPayload';
import { IChangeListDataPayload } from '../common/types/IChangeListDataPayload';
import ActionType from './common';

const getBoards = createAsyncThunk(
  ActionType.GET_BOARDS,
  async () => {
    const { boards }:IAllBoards = await api.get('/board');

    return boards;
  },
);

const addBoard = createAsyncThunk(
  ActionType.ADD_BOARD,
  async (boardData: IHomeBoard) => {
    const response:IHomeBoardServerResponse = await api.post('/board', boardData);
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
  async ({ title, boardId }: { title: string; boardId: number }) => {
    await api.put(`/board/${boardId}`, { title });
    const response: IBoard = await api.get(`/board/${boardId}`);

    return response.title;
  },
);
const deleteBoard = createAsyncThunk(
  ActionType.DELETE_BOARD,
  async (boardID:number) => {
    await api.delete(`/board/${boardID}`);
  },
);

const addList = createAsyncThunk(
  ActionType.ADD_LIST,
  async ({ listData, boardId }:{ listData:IChangeListDataPayload; boardId:number }) => {
    await api.post(`/board/${boardId}/list`, { ...listData });
    const response:IBoard = await api.get(`/board/${boardId}`);

    return response.lists;
  },
);

const changeListData = createAsyncThunk(
  ActionType.CHANGE_LIST_DATA,
  async ({ listData, boardId }:{ listData:IChangeListDataPayload;boardId:number }) => {
    const { id: listId } = listData;
    await api.put(`/board/${boardId}/list/${listId}`, { ...listData });
    const response: IBoard = await api.get(`/board/${boardId}`);

    return response.lists;
  },
);

const deleteList = createAsyncThunk(
  ActionType.DELETE_LIST,
  async ({ listId, boardId }:{ listId:number;boardId:number }) => {
    await api.delete(`/board/${boardId}/list/${listId}`);
    const response: IBoard = await api.get(`/board/${boardId}`);

    return response.lists;
  },
);

const addCard = createAsyncThunk(
  ActionType.ADD_CARD,
  async ({
    cardData,
    boardId,
  }: {
    cardData: IChangeCardDataPayload;
    boardId: number;
  }) => {
    await api.post(`/board/${boardId}/card`, { ...cardData });
    const response: IBoard = await api.get(`/board/${boardId}`);

    return response.lists;
  },
);

const changeCardData = createAsyncThunk(
  ActionType.CHANGE_CARD_DATA,
  async ({ cardData, boardId }:{ cardData:IChangeCardDataPayload; boardId:number }) => {
    await api.put(`/board/${boardId}/card/${cardData.id}`, { ...cardData });
    const response: IBoard = await api.get(`/board/${boardId}`);

    return response.lists;
  },
);

const deleteCard = createAsyncThunk(
  ActionType.DELETE_CARD,
  async ({ cardId, boardId }:{ cardId:number; boardId:number }) => {
    await api.delete(`/board/${boardId}/card/${cardId}`);
    const response: IBoard = await api.get(`/board/${boardId}`);

    return response.lists;
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
