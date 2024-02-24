import styles from './Card.module.scss'
interface CardProps {
    title: string
}

export default function Card(props: CardProps) {

    return (
        <div className={styles.card}>{props.title}</div>
    )
}