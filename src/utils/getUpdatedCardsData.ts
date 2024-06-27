
import { IChangeCardPosition } from '../common/interfaces/IChangeCardPosition';
import { IList } from '../common/interfaces/IList';

const increaseCardsPositionByOne = (list:IList, movedCardData:IChangeCardPosition):IChangeCardPosition[] => {
  const cardsToUpdate:IChangeCardPosition[] = [];
  list.cards
    .filter((card) => card.id !== movedCardData.id)
    .filter((card) => card.position >= movedCardData.position)
    .forEach(({ position, id }) => {
      const newPosition = position + 1;
      cardsToUpdate.push({ id, position: newPosition, list_id: list.id });
    });

  return cardsToUpdate;
};
const decreaseCardsPositionByOne = (list:IList, movedCardData:IChangeCardPosition):IChangeCardPosition[] => {
  const cardsToUpdate:IChangeCardPosition[] = [];
  const movedCard = list.cards.find((card) => card.id === movedCardData.id);
  list.cards
    .filter((card) => card.id !== movedCardData.id)
    .filter((card) => card.position >= movedCard!.position)
    .forEach(({ position, id }) => {
      const newPosition = position - 1;
      cardsToUpdate.push({ id, position: newPosition, list_id: list.id });
    });

  return cardsToUpdate;
};
const reorderCardsWithinList = (list: IList, movedCardData: IChangeCardPosition): IChangeCardPosition[] => {
  const cardsToUpdate: IChangeCardPosition[] = [];
  list.cards
    .filter((card) => card.id !== movedCardData.id)
    .filter((card) => card.position >= movedCardData.position)
    .forEach(({ id }, index) => {
      const newPosition = movedCardData.position + 1 + index;
      cardsToUpdate.push({ id, position: newPosition, list_id: list.id });
    });

  return cardsToUpdate;
};
const getUpdatedCardsData = (
  prevList: IList,
  nextList: IList,
  movedCardData: IChangeCardPosition,
): IChangeCardPosition[] => {
  if (prevList.id !== nextList.id) {
    return [
      { id: movedCardData.id, list_id: nextList.id, position: movedCardData.position },
      ...increaseCardsPositionByOne(nextList, movedCardData),
      ...decreaseCardsPositionByOne(prevList, movedCardData),
    ];
  }

  return [
    { id: movedCardData.id, list_id: nextList.id, position: movedCardData.position },
    ...reorderCardsWithinList(prevList, movedCardData),
  ];
};
export {
  decreaseCardsPositionByOne,
  getUpdatedCardsData,
  increaseCardsPositionByOne,
};
