import styles from './BoardIcon.module.scss'
import { Link } from 'react-router-dom'
import { IBoardServer } from '../../../../common/interfaces/IBoardServer.ts'



export default function BoardIcon(props: IBoardServer) {
    const {custom, title} = props
  return (
    <li className={styles.boardsPageListItem}>
      <Link
        className={styles.boardIcon}
        style={{ background: custom?.bgColor }}
        to={`board/${props.id}`}
      >
        <div>{title}</div>
        <div></div>
      </Link>
    </li>
  )
}
