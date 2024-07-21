import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { IHomeBoard } from '../../../../common/interfaces/IHomeBoard';
import styles from './BoardIcon.module.scss';

function BoardIcon({ custom, title, id }: IHomeBoard):ReactElement {
  return (
    <li
      className={styles.boardsPageListItem}
      style={{ background: custom?.color }}
    >
      <Link
        className={styles.boardIcon}
        to={`board/${id}`}
      >
        <div>{title}</div>
        <div />
      </Link>
    </li>
  );
}
export default BoardIcon;
