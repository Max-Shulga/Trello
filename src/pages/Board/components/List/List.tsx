import { ICard } from '../../../../features/cardSlice.ts'
import Card from '../Card/Card..tsx'
import styles from './List.module.scss'

interface ITitleColors {
    [name: string]: string;
}

const titleColors: ITitleColors = {
    blue: '#1c5a7c',
    green: '#106354',
    purple: '#54117d',
    yellow: '#f3c820',
    red: '#e73434',
    brown: '#71441b',
    orange: '#ef6f28',
    gray: '#9f9f9f',
    lightBlue: '#4af5f5'
};



interface ListProps {
    cards: ICard[]
}

export default function List(props: ListProps) {
    const { cards } = props
    return (
        <div className={styles.list}>
            {cards.map((cards,index) => (
                <div className={styles.card} key={cards.id}>
                    <h2 className={styles.cardTitle} style={{background:titleColors[Object.keys(titleColors)[index]]}}>{cards.title}</h2>

                    {cards.cases.map(cases => (
                        <Card key={cases.id} title={cases.title} />
                    ))}
                    <button className={styles.addTask}>+</button>
                </div>

            ))}
            <button className={styles.addCard}>+</button>
        </div>
    )
}