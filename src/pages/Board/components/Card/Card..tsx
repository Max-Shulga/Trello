import styles from './Card.module.scss'

interface CardProps {
  title: string
}

export default function Card(props: CardProps) {
  return (
    <li className={styles.cardContainer}>
      <div>{props.title}</div>
        <span/>
    </li>
  )
}
