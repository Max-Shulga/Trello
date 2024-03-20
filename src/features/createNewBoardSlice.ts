import { createSlice } from '@reduxjs/toolkit'
import { IBoard } from '../common/interfaces/IBoard.ts'

const initialState: IBoard = {
  title: '',
  custom: {
    bgColor: 'transparent',
  },
}

const createNewBoardSlice = createSlice({
  name: 'createNewBoard',
  initialState,
  reducers: {
    setBGColor: (state, action) => {
      state.custom ? (state.custom.bgColor = action.payload) : ''
    },
    setTitle: (state, action) => {
      state.title = action.payload
    },
  },
})

export const { setBGColor, setTitle } = createNewBoardSlice.actions
export default createNewBoardSlice.reducer
