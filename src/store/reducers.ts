import { reducer as toastrReducer } from 'react-redux-toastr';
import { combineReducers } from 'redux';

import boardSlice from './reducers/board/boardSlice';
import HomeSlice from './reducers/home/homeSlice';
import themeToggleSlice from './reducers/themeToggle/themeToggleSlice';

const rootReducer = combineReducers({
  home: HomeSlice,
  board: boardSlice,
  themeToggle: themeToggleSlice,
  toastr: toastrReducer,
});

export default rootReducer;
