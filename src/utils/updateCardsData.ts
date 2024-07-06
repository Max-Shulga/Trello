import { ICard } from '../common/interfaces/ICard';
import { IChangeCardPosition } from '../common/interfaces/IChangeCardPosition';
import { IList } from '../common/interfaces/IList';

const getReorderedList = (list:IList, movedCardData:IChangeCardPosition):(ICard | IChangeCardPosition)[] => {
  const filteredCards = list.cards.filter((card_) => card_.id !== movedCardData.id);

  return [
    ...filteredCards.slice(0, movedCardData.position),
    movedCardData,
    ...filteredCards.slice(movedCardData.position)];
};

const reorderCards = (cards:(ICard | IChangeCardPosition)[], list_id: number)
: IChangeCardPosition[] => cards
  .reduce((updatedCards: IChangeCardPosition[], { id }, index) => {
    updatedCards.push({ id, position: index + 1, list_id });

    return updatedCards;
  }, []);
const updateCardsData = (
  sourceList: IList,
  destinationList: IList,
  movedCardData: IChangeCardPosition,
): IChangeCardPosition[] => {
  if (sourceList.id !== destinationList.id) {
    const updatedSourceCards = sourceList.cards.filter((card) => card.id !== movedCardData.id);
    const updatedDestinationCards = getReorderedList(destinationList, movedCardData);

    return [
      ...reorderCards(updatedDestinationCards, destinationList.id),
      ...reorderCards(updatedSourceCards, sourceList.id),
    ];
  }

  const updatedList = getReorderedList(sourceList, movedCardData);

  return [...reorderCards(updatedList, sourceList.id)];
};

export default updateCardsData;
