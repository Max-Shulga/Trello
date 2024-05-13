import { reducer as toastrReducer } from 'react-redux-toastr';
import { combineReducers } from 'redux';

import boardSlice from './boardSlice';
import HomeSlice from './homeSlice';
import themeToggleSlice from './themeToggleSlice';

const rootReducer = combineReducers({
  home: HomeSlice,
  board: boardSlice,
  themeToggle: themeToggleSlice,
  toastr: toastrReducer,
});

export default rootReducer;
