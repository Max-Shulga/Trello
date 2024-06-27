import React from 'react';

import { useAppSelector } from '../../../../store/hooks.ts';
import styles from './CardModalMembers.module.scss';

function CardModalMember():React.JSX.Element {
  const { selectedCard } = useAppSelector((state) => state.board);
  const { users } = selectedCard!;

  return (
    <section>
      <h3>Members:</h3>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li>{user}</li>
        ))}
      </ul>
    </section>
  );
}

export default CardModalMember;
