import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import api from '../../api/request';
import { IAuthResponse } from '../../common/interfaces/IAuthResponse';
import { IBoard } from '../../common/interfaces/IBoard';
import { IChangeCardPosition } from '../../common/interfaces/IChangeCardPosition';
import { IHomeBoard, IHomeBoards } from '../../common/interfaces/IHomeBoard';
import { ISignIn } from '../../common/interfaces/ISignIn';
import { IChangeCardDataPayload } from '../../common/types/IChangeCardDataPayload';
import { IChangeListDataPayload } from '../../common/types/IChangeListDataPayload';
import ActionType from './common';

const getBoards = createAsyncThunk(
  ActionType.GET_BOARDS,
  async () => {
    const { boards }:IHomeBoards = await api.get('/board');
    // console.log(boards.boards);

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

    return { ...response, boardId };
  },
);
const getOtherBoardById = createAsyncThunk(
  ActionType.GET_OTHER_BOARD_BY_ID,
  async (boardId: number) => {
    const response:IBoard = await api.get(`/board/${boardId}`);

    return { ...response, boardId };
  },
);

const changeBoardTitle = createAsyncThunk(
  ActionType.CHANGE_BOARD_TITLE,
  async ({ title, boardId }:{ title:string, boardId:number }) => {
    await api.put(`/board/${boardId}`, { title });
  },
);

const deleteBoard = createAsyncThunk(
  ActionType.DELETE_BOARD,
  async ({ boardId }: { boardId:number }) => {
    await api.delete(`/board/${boardId}`);
  },
);

const addList = createAsyncThunk(
  ActionType.ADD_LIST,
  async ({ listData, boardId }: { listData:IChangeListDataPayload, boardId:number }) => {
    await api.post(`/board/${boardId}/list`, { ...listData });
  },
);

const changeListData = createAsyncThunk(
  ActionType.CHANGE_LIST_DATA,
  async ({ listData, boardId }: { listData: IChangeListDataPayload; boardId: number }) => {
    await api.put(`/board/${boardId}/list/${listData.id}`, { ...listData });
  },
);

const deleteList = createAsyncThunk(
  ActionType.DELETE_LIST,
  async ({ listId, boardId }: { listId:number, boardId:number }) => {
    await api.delete(`/board/${boardId}/list/${listId}`);
  },
);
const changeListPosition = createAsyncThunk(
  ActionType.CHANGE_LIST_POSITION,
  async ({ listId, boardId, newPosition }: { listId: number; boardId: number; newPosition: number }) => {
    await api.put(`/board/${boardId}/list/${listId}`, { position: newPosition });
  },
);

const addCard = createAsyncThunk(
  ActionType.ADD_CARD,
  async ({ cardData, boardId }:{ cardData:IChangeCardDataPayload, boardId:number }) => {
    await api.post(`/board/${boardId}/card`, { ...cardData });
  },
);

const changeCardData = createAsyncThunk(
  ActionType.CHANGE_CARD_TITLE,
  async ({ cardData, boardId }: { cardData: IChangeCardDataPayload; boardId: number }) => {
    await api.put(`/board/${boardId}/card/${cardData.id}`, { ...cardData });
  },
);

const deleteCard = createAsyncThunk(
  ActionType.DELETE_CARD,
  async ({ cardId, boardId }:{ cardId:number, boardId:number }) => {
    await api.delete(`/board/${boardId}/card/${cardId}`);
  },
);
const changeCardPosition = createAsyncThunk(
  ActionType.CHANGE_CARD_POSITION,
  async ({ cardsData, boardId }: { boardId:number, cardsData:IChangeCardPosition[], }) => {
    await api.put(`/board/${boardId}/card`, cardsData);
  },
);
const signUp = createAsyncThunk(ActionType.ADD_USER, async (userData: ISignIn): Promise<void> => {
  await api.post('/user', userData);
});

const signIn = createAsyncThunk<
IAuthResponse,
ISignIn,
{ rejectValue: number }
>(
  ActionType.USER_SIGN_IN,
  async (userData, { rejectWithValue }) => {
    try {
      const { token, refreshToken } :IAuthResponse = await api.post('/login', userData);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      return { token, refreshToken };
    } catch (err) {
      const error = err as AxiosError;

      return rejectWithValue(error?.response?.status || 0);
    }
  },
);

export {
  addBoard,
  addCard,
  addList,
  changeBoardTitle,
  changeCardData,
  changeCardPosition,
  changeListData,
  changeListPosition,
  deleteBoard,
  deleteCard,
  deleteList,
  getBoardById,
  getBoards,
  getOtherBoardById,
  signIn,
  signUp,
};
