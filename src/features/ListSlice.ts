import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IList } from '../common/interfaces/IList.ts'
import { ICard } from '../common/interfaces/ICard'

// export type BoardStatuses = IBoard['cardTitles'][number]

const initialState: IList = {
  id: 0,
  title: '',
  cards: [],
}

const listSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<ICard>) => {
      state.cards.push(action.payload)
    },
    removeCard: (state, action: PayloadAction<{ id: number }>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload.id)
    },
  },
})
export const { addCard, removeCard } = listSlice.actions
export default listSlice.reducer
