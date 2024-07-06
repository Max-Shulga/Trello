import { IChangeCardPosition } from '../common/interfaces/IChangeCardPosition';
import { IList } from '../common/interfaces/IList';

const decreaseCardsPositionByOne = (list:IList, movedCardData:IChangeCardPosition)
:IChangeCardPosition[] => {
  const movedCard = list.cards.find((card) => card.id === movedCardData.id);

  return list.cards
    .filter((card) => card.id !== movedCardData.id)
    .filter((card) => card.position >= movedCard!.position)
    .reduce((updatedCards: IChangeCardPosition[], { position, id }) => {
      const newPosition = position - 1;
      updatedCards.push({ id, position: newPosition, list_id: list.id });

      return updatedCards;
    }, []);
};
export default decreaseCardsPositionByOne;
