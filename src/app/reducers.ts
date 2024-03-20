import { combineReducers } from 'redux'
import boardSlice from '../features/boardSlice.ts'
import cardSlice from '../features/ListSlice.ts'
import listSlice from '../features/ListSlice.ts'
import themeToggleSlice from '../features/themeToggleSlice.ts'
import boardsSlice  from '../features/boardsSlice.ts'
import createNewBoardSlice from '../features/createNewBoardSlice.ts'

const rootReducer = combineReducers({
  createNewBoard:createNewBoardSlice,
  boards: boardsSlice,
  board: boardSlice,
  list: listSlice,
  card: cardSlice,
  themeToggle: themeToggleSlice,
})

export { rootReducer }
