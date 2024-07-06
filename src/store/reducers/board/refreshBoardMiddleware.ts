import { Action, Middleware } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../../types';
import { getBoardById } from '../actions';
import ActionType from '../common';

/* eslint-disable-next-line @typescript-eslint/ban-types */
const refreshBoardMiddleware: Middleware<{}, RootState> = ({ dispatch, getState }) => (next) => (action) => {
  const typedDispatch = dispatch as ThunkDispatch<RootState, unknown, Action>;
  const typedAction = action as Action;
  const { board } = getState().board;
  const { boardId } = board;
  const actions = [
    `${ActionType.CHANGE_BOARD_TITLE}/fulfilled`,
    `${ActionType.CHANGE_LIST_DATA}/fulfilled`,
    `${ActionType.CHANGE_CARD_TITLE}/fulfilled`,
    `${ActionType.ADD_LIST}/fulfilled`,
    `${ActionType.ADD_CARD}/fulfilled`,
    `${ActionType.CHANGE_CARD_POSITION}/fulfilled`,
  ];

  if (actions.includes(typedAction.type)) {
    if (boardId) typedDispatch(getBoardById(boardId));
  }

  return next(typedAction);
};

export default refreshBoardMiddleware;
