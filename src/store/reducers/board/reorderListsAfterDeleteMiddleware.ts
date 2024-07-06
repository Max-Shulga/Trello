import { Action, Middleware } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../../types';
import {
  changeListPosition, getBoardById,
} from '../actions';
import ActionType from '../common';

interface MetaAction extends Action {
  meta: {
    arg: {
      listId: number;
    };
  };
}
/* eslint-disable-next-line @typescript-eslint/ban-types */
const reorderListsAfterDeleteMiddleware: Middleware<{}, RootState> = ({ dispatch, getState }) => (next) => (action) => {
  const typedDispatch = dispatch as ThunkDispatch<RootState, unknown, Action>;
  const typedAction = action as MetaAction;
  const { board } = getState().board;
  const { boardId, lists } = board;

  if (typedAction.type === `${ActionType.DELETE_LIST}/fulfilled`) {
    const deletedListId = typedAction.meta.arg.listId;
    const deletedList = lists.find((list) => list.id === deletedListId);

    if (deletedList) {
      (async (): Promise<void> => {
        const promises = lists
          .filter((list) => list.position > deletedList.position)
          .map(async (list) => {
            const newPosition = list.position - 1;
            await typedDispatch(changeListPosition({ boardId, listId: list.id, newPosition }));
          });

        await Promise.all(promises);
        await typedDispatch(getBoardById(boardId));
      })();
    }
  }

  return next(typedAction);
};

export default reorderListsAfterDeleteMiddleware;
