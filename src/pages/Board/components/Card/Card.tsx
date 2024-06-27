import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import penIcon from '../../../../assets/penIcon.svg';
import { ICard } from '../../../../common/interfaces/ICard';
import styles from './Card.module.scss';

interface CardProps {
  card:ICard
  onDragStart: (card:ICard) => void
  onDragDrop: (e: React.DragEvent<HTMLLIElement>, card:ICard) => void
}

function Card({
  card,
  onDragStart,
  onDragDrop,
}: CardProps): React.JSX.Element {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const onDragStartHandler = (e: React.DragEvent<HTMLLIElement>): void => {
    setIsDragging(true);
    e.stopPropagation();

    onDragStart(card);
  };

  const onDragOverHandler = (e: React.DragEvent<HTMLLIElement>): void => {
    if (e.currentTarget.classList.contains(styles.cardContainer)) {
      e.currentTarget.style.boxShadow = '0 4px 3px gray';
    }
  };

  const onDragLeaveHandler = (e: React.DragEvent<HTMLLIElement>): void => {
    e.currentTarget.style.boxShadow = 'none';
  };

  const onDragEndHandler = (e: React.DragEvent<HTMLLIElement>): void => {
    setIsDragging(false);
    e.currentTarget.style.boxShadow = 'none';
  };

  const onDragDropHandler = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault();

    onDragDrop(e, card);
    setIsDragging(false);
    e.currentTarget.style.boxShadow = 'none';
  };

  const handleOpenCardModal = (): void => {
    navigate(`c/${card.id}`);
  };

  return (
    <li
      className={`${styles.cardContainer} ${isDragging ? styles.dragging : ''}`}
      draggable
      onDragStart={onDragStartHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDragEnd={onDragEndHandler}
      onDrop={onDragDropHandler}
    >
      <div>
        {card.title}
        {' '}
        position:
        {card.position}
      </div>
      <button
        type="button"
        className={styles.changeCardTitleButton}
        onClick={handleOpenCardModal}
      >
        <img src={penIcon} alt="pen" />
      </button>
    </li>
  );
}
export default Card;
