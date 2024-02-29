import Card from '../Card/Card..tsx'
import styles from './List.module.scss'
import { IList } from '../../../../common/interfaces/IList.ts'

interface ITitleColors {
  [name: string]: string
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
  lightBlue: '#4af5f5',
}

interface ListProps {
  lists: IList[]
}

export default function List(props: ListProps) {
  const { lists } = props
  return (
    <div className={styles.list}>
      {lists.map((cards, index) => (
        <div className={styles.card} key={cards.id}>
          <h2
            className={styles.cardTitle}
            style={{
              background: titleColors[Object.keys(titleColors)[index]],
            }}
          >
            {cards.title}
          </h2>

          {cards.cards.map(card => (
            <Card key={card.id} title={card.title} />
          ))}
          <button className={styles.addTask}>+</button>
        </div>
      ))}
      <button className={styles.addCard}>+</button>
    </div>
  )
}
