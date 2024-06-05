import { createSlice } from '@reduxjs/toolkit';

import { IHomeBoards } from '../../../common/interfaces/IHomeBoard';
import { addBoard, getBoards } from '../actions';

interface IInitialState extends IHomeBoards {
  isLoading:boolean
}

const initialState: IInitialState = {
  boards: [],
  isLoading: true,

};

const homeSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.fulfilled, (state, action) => ({
        ...state,
        boards: action.payload ?? [],
        isLoading: false,
      }))
      .addCase(addBoard.fulfilled, (state, action) => ({
        ...state,
        boards: [...state.boards, action.payload],
        isLoading: false,
      }));
  },
});
export default homeSlice.reducer;
