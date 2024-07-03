import React, { useEffect, useState } from 'react';

import { IBoard } from '../../../../../../common/interfaces/IBoard';
import { IList } from '../../../../../../common/interfaces/IList';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import { getOtherBoardById } from '../../../../../../store/reducers/actions';
import Dropdown from '../../../../../../ui/Dropdown/Dropdown';
import styles from './CardLocationSelector.module.scss';

interface Props {
  selectBoardId:(id:number)=>void
  selectListId:(id:number)=>void
  selectPosition:(id:number)=>void
}

function CardLocationSelector({ selectBoardId, selectListId, selectPosition }:Props):React.JSX.Element {
  const {
    board, selectedList, selectedCard, otherBoard,
  } = useAppSelector((state) => state.board);
  const { boards } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();
  const [selectedBoard, setSelectedBoard] = useState<IBoard>(board);
  const [currentSelectedList, setCurrentSelectedList] = useState<IList | undefined>(selectedList);
  const [currentCardPosition, setCurrentCardPosition] = useState<number | undefined>(selectedCard.position);

  useEffect(() => {
    if (otherBoard.boardId) {
      setSelectedBoard(otherBoard);
      setCurrentSelectedList(otherBoard.lists[0]);
      setCurrentCardPosition(otherBoard.lists[0]?.cards[0]?.position);
    }
  }, [otherBoard]);
  const handleSelectBoard = async (id:number):Promise<void> => {
    selectBoardId(id);

    await dispatch(getOtherBoardById(id));
  };

  const handleSelectList = (list:IList):void => {
    setCurrentSelectedList(list);
    setCurrentCardPosition(list.cards[0]?.position ?? '');
    selectListId(list.id);
  };

  const handleSelectPosition = (position:number):void => {
    selectPosition(position);
    setCurrentCardPosition(position);
  };

  const getIndexValue = ():string => {
    let dropdownDefaultValue = ' ';

    if (currentSelectedList) {
      dropdownDefaultValue = currentCardPosition ? currentCardPosition.toString() : '1';
    }

    return dropdownDefaultValue;
  };

  return (
    <section className={styles.container}>
      <div className={styles.dropDownContainer}>
        <h5>Board</h5>
        <Dropdown defaultValue={selectedBoard.title}>
          {boards
            && boards.map((board_) => (
              <button
                type="button"
                key={board_.id}
                className={styles.selectorButton}
                onClick={() => handleSelectBoard(board_.id)}
              >
                {board_.title}
              </button>
            ))}
        </Dropdown>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.dropDownContainer}>
          <h5>List</h5>
          <Dropdown defaultValue={currentSelectedList?.title ?? ' '}>
            {selectedBoard.lists
              && selectedBoard.lists.map((list) => (
                <button
                  type="button"
                  key={list.id}
                  className={styles.selectorButton}
                  onClick={() => handleSelectList(list)}
                >
                  {list.title}
                </button>
              ))}
          </Dropdown>
        </div>
        <div className={styles.dropDownContainer}>
          <h5>Position</h5>
          <Dropdown defaultValue={getIndexValue()}>
            {currentSelectedList ? (
              <>
                {currentSelectedList!.cards.map((card) => (
                  <button
                    type="button"
                    key={card.id}
                    className={styles.selectorButton}
                    onClick={() => handleSelectPosition(card.position)}
                  >
                    {card.position}
                  </button>
                ))}
                <button
                  type="button"
                  className={styles.selectorButton}
                  onClick={() => handleSelectPosition(currentSelectedList!.cards.length + 1)}
                >
                  {currentSelectedList!.cards.length + 1}
                </button>
              </>
            ) : <div />}
          </Dropdown>
        </div>
      </div>
    </section>
  );
}

export default CardLocationSelector;
