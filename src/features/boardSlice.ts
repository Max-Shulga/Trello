import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBoard } from '../common/interfaces/IBoard.ts'
import { IList } from '../common/interfaces/IList.ts'

const initialState: IBoard = {
  id: 0,
  title: '',
  lists: [],
  // cardTitles: []
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<IList>) => {
      state.lists.push(action.payload)
    },
    removeList: (state, action: PayloadAction<{ id: number }>) => {
      state.lists = state.lists.filter(list => list.id !== action.payload.id)
    },
    changeListTitle: (state, action: PayloadAction<IList>) => {
      const { id, title } = action.payload
      state.lists = state.lists.map(list => {
        return list.id === id ? { ...list, title: title } : list
      })
    },
    // changeCaseStatus: (state: IBoard, action: PayloadAction<{ cardId: number, caseId: number, newStatus: BoardStatuses }>) => {
    //     const {cardId, caseId, newStatus} = action.payload
    //
    //     const currentCard = state.lists.filter(list => list.id === cardId)[0];
    //     if (!currentCard) return state
    //     const currentCase: ICard = currentCard.lists.filter(lists => lists.id === caseId)[0]
    //
    //     currentCard.lists = currentCard.lists.filter(lists => lists.id !== caseId)
    //
    //     const newStatusCard = state.lists.filter(list => list.title === newStatus)[0]
    //     if (!newStatusCard) return state
    //     newStatusCard.lists.push(currentCase)
    // }
  },
})
export const { addList, removeList, changeListTitle } = boardSlice.actions
export default boardSlice.reducer
