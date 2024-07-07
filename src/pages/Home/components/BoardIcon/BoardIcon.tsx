import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { IHomeBoard } from '../../../../common/interfaces/IHomeBoard';
import styles from './BoardIcon.module.scss';

function BoardIcon({ custom, title, id }: IHomeBoard):ReactElement {
  return (
    <li className={styles.boardsPageListItem}>
      <Link
        className={styles.boardIcon}
        style={{ background: custom?.color }}
        to={`board/${id}`}
      >
        <div>{title}</div>
        <div />
      </Link>
    </li>
  );
}
export default BoardIcon;
