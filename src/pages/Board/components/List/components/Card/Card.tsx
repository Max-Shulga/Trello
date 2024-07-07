import React from 'react';
import { useNavigate } from 'react-router-dom';

import penIcon from '../../../../../../assets/penIcon.svg';
import { ICard } from '../../../../../../common/interfaces/ICard';
import styles from './Card.module.scss';

interface CardProps {
  card:ICard
}

function Card({ card }: CardProps): React.JSX.Element {
  const navigate = useNavigate();

  const handleOpenCardModal = (): void => {
    navigate(`${card.id}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.cardContainer}
      onClick={handleOpenCardModal}
    >
      <div className={styles.cardTitle}>
        {card.title}
      </div>
      <img src={penIcon} alt="pen" />
    </div>
  );
}
export default Card;
