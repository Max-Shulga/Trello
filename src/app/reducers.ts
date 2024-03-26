import { combineReducers } from 'redux'
import boardSlice from '../features/BoardSlice.ts'
import listSlice from '../features/listSlice.ts'
import themeToggleSlice from '../features/themeToggleSlice.ts'
import HomeBoardsSlice from '../features/HomeBoardsSlice.ts'

const rootReducer = combineReducers({
  boards: HomeBoardsSlice,
  board: boardSlice,
  list: listSlice,
  themeToggle: themeToggleSlice,
})

export { rootReducer }
