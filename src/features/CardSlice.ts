import { ICard } from '../common/interfaces/ICard'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ICard = {
  id: 0,
  title: '',
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    editCard: (state, action: PayloadAction<{ newTitle: string }>) => {
      state.title = action.payload.newTitle
    },
  },
})

export const { editCard } = cardSlice.actions

export default cardSlice
