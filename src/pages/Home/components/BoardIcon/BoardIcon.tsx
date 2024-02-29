import { IBoardIcon } from '../../../../common/interfaces/IBoardIcon.ts'
import styles from './BoardIcon.module.scss'
import { Link } from 'react-router-dom'

interface IProps {
    boardIcon: IBoardIcon
}

export default function BoardIcon(props: IProps) {
    const { custom, title } = props.boardIcon
    const backgroundColor = custom.background

    return (
      <Link className={styles.boardIcon} style={{ background: backgroundColor }} to={`board/${props.boardIcon.id}`}>
          <h3>{title}</h3>
      </Link>
    )
}
