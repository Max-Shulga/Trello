import { IBoardIcon } from '../../../../common/interfaces/IBoardIcon.ts'
import styles from './BoardIcon.module.scss'

interface IProps {
  boardIcon: IBoardIcon
}

export default function BoardIcon(props: IProps) {
  const { custom, title } = props.boardIcon
  const backgroundColor = custom.background
  return (
    <div className={styles.boardIcon} style={{ background: backgroundColor }}>
      <h3>{title}</h3>
    </div>
  )
}
