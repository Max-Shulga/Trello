import { reducer as toastrReducer } from 'react-redux-toastr';
import { combineReducers } from 'redux';

import authSlice from './reducers/auth/authSlice';
import boardSlice from './reducers/board/boardSlice';
import HomeSlice from './reducers/home/homeSlice';
import themeToggleSlice from './reducers/themeToggle/themeToggleSlice';

const rootReducer = combineReducers({
  home: HomeSlice,
  board: boardSlice,
  auth: authSlice,
  themeToggle: themeToggleSlice,
  toastr: toastrReducer,
});

export default rootReducer;
