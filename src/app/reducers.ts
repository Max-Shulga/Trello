import { combineReducers } from 'redux'
import boardSlice from '../features/BoardSlice.ts'
import themeToggleSlice from '../features/themeToggleSlice.ts'
import HomeBoardsSlice from '../features/HomeBoardsSlice.ts'
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
  boards: HomeBoardsSlice,
  board: boardSlice,
  themeToggle: themeToggleSlice,
  toastr: toastrReducer
})

export { rootReducer }
