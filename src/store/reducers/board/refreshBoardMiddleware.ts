/* eslint-disable @typescript-eslint/naming-convention */

import { Action, Middleware } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ICard } from '../../../common/interfaces/ICard';
import { IChangeCardPosition } from '../../../common/interfaces/IChangeCardPosition';
import { decreaseCardsPositionByOne } from '../../../utils/getUpdatedCardsData';
import { RootState } from '../../types';
import {
  changeCardPosition,
  changeListPosition, getBoardById,
} from '../actions';
import ActionType from '../common';

interface MetaAction extends Action {
  meta: {
    arg: {
      listId: number;
      boardId:number,
      cardsData:ICard & IChangeCardPosition
      cardId:number
    };
  };
}
/* eslint-disable-next-line @typescript-eslint/ban-types */
const refreshBoardMiddleware: Middleware<{}, RootState> = ({ dispatch, getState }) => (next) => (action) => {
  const typedDispatch = dispatch as ThunkDispatch<RootState, unknown, Action>;
  const typedAction = action as MetaAction;
  const { board } = getState().board;
  const { boardId, lists } = board;

  if (
    typedAction.type === `${ActionType.CHANGE_BOARD_TITLE}/fulfilled`
    || typedAction.type === `${ActionType.CHANGE_LIST_DATA}/fulfilled`
    || typedAction.type === `${ActionType.CHANGE_CARD_TITLE}/fulfilled`
    || typedAction.type === `${ActionType.ADD_LIST}/fulfilled`
    || typedAction.type === `${ActionType.ADD_CARD}/fulfilled`
    || typedAction.type === `${ActionType.CHANGE_CARD_POSITION}/fulfilled`
  ) {
    if (boardId) typedDispatch(getBoardById(boardId));
  }

  // update list positions after deleting one of the lists
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

  if (typedAction.type === `${ActionType.DELETE_CARD}/fulfilled`) {
    const { cardId } = typedAction.meta.arg;
    const list = board.lists.find((list_) => list_.cards.some((card:ICard) => card.id === cardId))!;
    const deletedCard = list.cards.find((card) => card.id === cardId)!;
    const cardsDataToUpdate = decreaseCardsPositionByOne(
      list,
      { id: deletedCard.id, position: deletedCard.position, list_id: list.id },
    );
    typedDispatch(changeCardPosition({ cardsData: cardsDataToUpdate, boardId }));
    typedDispatch(getBoardById(boardId));
  }

  return next(typedAction);
};

export default refreshBoardMiddleware;
