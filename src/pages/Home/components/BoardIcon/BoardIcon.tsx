import styles from './BoardIcon.module.scss'
import { Link } from 'react-router-dom'
import { IHomeBoardServerResponse } from '../../../../common/interfaces/IHomeBoard.ts'



export default function BoardIcon(props: IHomeBoardServerResponse) {
    const {custom, title} = props
  return (
    <li className={styles.boardsPageListItem}>
      <Link
        className={styles.boardIcon}
        style={{ background: custom?.color }}
        to={`board/${props.id}`}
      >
        <div>{title}</div>
        <div></div>
      </Link>
    </li>
  )
}
