import { Action, Middleware } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { getBoardById } from './actions';
import ActionType from './common';
import { RootState } from './types';

/* eslint-disable-next-line @typescript-eslint/ban-types */
const refreshBoardMiddleware: Middleware<{}, RootState> = ({ dispatch, getState }) => (next) => (action) => {
  const typedDispatch = dispatch as ThunkDispatch<RootState, unknown, Action>;
  const typedAction = action as Action;
  const state = getState();

  if (
    typedAction.type === `${ActionType.CHANGE_BOARD_TITLE}/fulfilled`
    || typedAction.type === `${ActionType.CHANGE_LIST_DATA}/fulfilled`
    || typedAction.type === `${ActionType.CHANGE_CARD_DATA}/fulfilled`
    || typedAction.type === `${ActionType.ADD_LIST}/fulfilled`
    || typedAction.type === `${ActionType.ADD_CARD}/fulfilled`
    || typedAction.type === `${ActionType.DELETE_LIST}/fulfilled`
    || typedAction.type === `${ActionType.DELETE_CARD}/fulfilled`
  ) {
    typedDispatch(getBoardById(state.board.id ?? 0));
  }

  return next(typedAction);
};

export default refreshBoardMiddleware;
