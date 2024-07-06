import { Action, Middleware } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ICard } from '../../../common/interfaces/ICard';
import decreaseCardsPositionByOne from '../../../utils/decreaseCardsPositionByOne';
import { RootState } from '../../types';
import { changeCardPosition, getBoardById } from '../actions';
import ActionType from '../common';

interface MetaAction extends Action {
  meta: {
    arg: {
      cardId:number
    };
  };
}
/* eslint-disable-next-line @typescript-eslint/ban-types */
const reorderCardsAfterDeleteMiddleware: Middleware<{}, RootState> = ({ dispatch, getState }) => (next) => (action) => {
  const typedDispatch = dispatch as ThunkDispatch<RootState, unknown, Action>;
  const typedAction = action as MetaAction;
  const { board } = getState().board;
  const { boardId } = board;

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

export default reorderCardsAfterDeleteMiddleware;
