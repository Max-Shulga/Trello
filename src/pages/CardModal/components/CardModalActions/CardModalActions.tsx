import React from 'react';

import styles from './CardModalActions.module.scss';
import CardModalArchive from './components/CardModalArchive/CardModalArchive';
import CardProcessModal from './components/CardProcessModal/CardProcessModal';

function CardModalActions():React.JSX.Element {
  return (
    <section className={styles.actionsContainer}>
      <h2>Actions</h2>
      <CardProcessModal actionType="copy" />
      <CardProcessModal actionType="move" />
      <CardModalArchive />
    </section>
  );
}

export default CardModalActions;
