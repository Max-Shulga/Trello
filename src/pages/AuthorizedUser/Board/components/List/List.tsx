import React from 'react';

import { ICard } from '../../../../../common/interfaces/ICard';
import { IList } from '../../../../../common/interfaces/IList';
import Card from './components/Card/Card';
import CardCreator from './components/CardCreator/CardCreator';
import ListHeader from './components/ListHeader/ListHeader';
import styles from './List.module.scss';

interface ListProps {
  list: IList
  onDragStart: (list:IList, card:ICard) => void
  onDragOver:(e: React.DragEvent<HTMLLIElement>)=> void
  onDragDrop: (e: React.DragEvent<HTMLLIElement>, list:IList, card:ICard) => void
  onEmptyListDrop:(e: React.DragEvent<HTMLLIElement>, list:IList)=>void
}

function List(props: ListProps) :React.JSX.Element {
  const {
    list, onDragStart, onDragDrop, onEmptyListDrop, onDragOver,
  } = props;

  const handleDragDrop = (e: React.DragEvent<HTMLLIElement>, card:ICard): void => {
    e.preventDefault();
    onDragDrop(e, list, card);
  };
  const handleDragStart = (card:ICard): void => {
    onDragStart(list, card);
  };

  return (
    <li
      className={styles.listEl}
      onDrop={(e) => onEmptyListDrop(e, list)}
      onDragOver={onDragOver}
    >
      <div className={styles.cardContentContainer} key={list.id}>
        <div className={styles.listContent}>
          <ListHeader list={list} />
          <div className={styles.listBody}>
            <ul className={styles.cardsContainer}>
              {list.cards.map((card) => (
                <div className={styles.cardContainer} key={card.id}>
                  <Card
                    card={card}
                    onDragStart={handleDragStart}
                    onDragDrop={handleDragDrop}
                  />
                </div>
              ))}
            </ul>
            <CardCreator list={list} />
          </div>
        </div>
      </div>
    </li>
  );
}
export default List;
