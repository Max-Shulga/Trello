import React from 'react';

import { useAppSelector } from '../../../../store/hooks';
import Button from '../../../../ui/Button/Button';
import styles from './CardModalDescription.module.scss';

function CardModalDescription() :React.JSX.Element {
  const { description } = useAppSelector((state) => state.board.selectedCard);

  return (
    <section>
      <div className={styles.header}>
        <h3>Description</h3>
        <Button
          type="button"
        >
          Change
        </Button>
      </div>

      <p className={styles.text}>{description}</p>
    </section>
  );
}
export default CardModalDescription;
