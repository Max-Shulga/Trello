import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { IList } from '../../../../common/interfaces/IList';
import StrictModeDroppable from '../../../../ui/StrictModeDroppable/StrictModeDroppable';
import Card from './components/Card/Card';
import CardCreator from './components/CardCreator/CardCreator';
import ListHeader from './components/ListHeader/ListHeader';
import styles from './List.module.scss';

interface ListProps {
  list: IList
}

function List({ list }: ListProps) :React.JSX.Element {
  return (
    <li className={styles.listEl} key={list.id}>
      <div className={styles.cardContentContainer}>
        <div className={styles.listContent}>
          <ListHeader list={list} />
          <div className={styles.listBody}>
            <StrictModeDroppable droppableId={String(list.id)}>
              {(provided) => (
                <div
                  className={styles.cardsContainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {list.cards.map((card, index) => (
                    <Draggable draggableId={String(card.id)} index={index} key={card.id}>
                      {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={styles.draggableContainer}
                        >
                          <Card card={card} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </div>
          <CardCreator list={list} />
        </div>
      </div>
    </li>
  );
}

export default List;
