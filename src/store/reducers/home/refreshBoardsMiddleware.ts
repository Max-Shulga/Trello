import { Action, Middleware } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../../types';
import { getBoards } from '../actions';
import ActionType from '../common';

/* eslint-disable-next-line @typescript-eslint/ban-types */
const refreshBoardsMiddleware: Middleware<{}, RootState> = ({ dispatch }) => (next) => (action) => {
  const typedDispatch = dispatch as ThunkDispatch<RootState, unknown, Action>;
  const typedAction = action as Action;

  if (
    typedAction.type === `${ActionType.CHANGE_BOARD_TITLE}/fulfilled`
    || typedAction.type === `${ActionType.DELETE_BOARD}/fulfilled`
    || typedAction.type === `${ActionType.ADD_BOARD}/fulfilled`
  ) {
    typedDispatch(getBoards());
  }

  return next(typedAction);
};

export default refreshBoardsMiddleware;
