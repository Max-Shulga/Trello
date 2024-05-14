import { Action, Middleware } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { getBoards } from './actions';
import ActionType from './common';
import { RootState } from './types';

/* eslint-disable-next-line @typescript-eslint/ban-types */
const refreshBoardsMiddleware: Middleware<{}, RootState> = ({ dispatch }) => (next) => (action) => {
  const typedDispatch = dispatch as ThunkDispatch<RootState, unknown, Action>;
  const typedAction = action as Action;

  if (typedAction.type === `${ActionType.CHANGE_BOARD_TITLE}/fulfilled`) {
    typedDispatch(getBoards());
  }

  return next(typedAction);
};

export default refreshBoardsMiddleware;
