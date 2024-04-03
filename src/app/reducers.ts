import { combineReducers } from 'redux'
import boardSlice from '../features/BoardSlice.ts'
import themeToggleSlice from '../features/themeToggleSlice.ts'
import HomeBoardsSlice from '../features/HomeBoardsSlice.ts'

const rootReducer = combineReducers({
  boards: HomeBoardsSlice,
  board: boardSlice,
  themeToggle: themeToggleSlice,
})

export { rootReducer }
