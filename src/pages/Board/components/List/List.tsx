import styles from './List.module.scss'
import Card from '../Card/Card..tsx'
import { ChangeEvent, useState } from 'react'
import InputForm from '../../../../components/InputForm/InputForm.tsx'
import { addCard, changeListData, deleteList } from '../../../../features/BoardSlice.ts'
import { AppDispatch } from '../../../../app/store.ts'
import { IList } from '../../../../common/interfaces/IList.ts'
import { IChangeCardDataPayload } from '../../../../common/types/IChangeCardDataPayload.ts'
import { IChangeListDataPayload } from '../../../../common/types/IChangeListDataPayload.ts'

interface ListProps {
  list: IList
  dispatch: AppDispatch
}

export default function List(props: ListProps) {
  const [showNewTitleInput, setShowNewTitleInput] = useState(false)
  const [showNewCardInput, setShowNewCardInput] = useState(false)
  const { list, dispatch } = props
  const position = list.cards.length
  const [newListTitle, setNewListTitle] = useState<IChangeListDataPayload>({
    title: '',
    position: list.position,
    id: list.id,
  })

  const [newCard, setNewCard] = useState<IChangeCardDataPayload>({
    list_id: list.id,
    title: '',
    position: position,
  })

  const handleNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setNewListTitle({
      ...newListTitle,
      title: newTitle,
    })
  }

  const handleTitleSubmit = () => {
    setShowNewTitleInput(false)
    if (newListTitle.title) dispatch(changeListData(newListTitle))
  }

  const handleCardInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCardValue = e.target.value
    setNewCard({
      ...newCard,
      title: newCardValue,
    })
  }
  const handleCardSubmit = () => {
    setShowNewCardInput(false)
    if (newCard.title) dispatch(addCard(newCard))
  }

  const handleDeleteList = () => {
    dispatch(deleteList(list.id))
  }
  return (
    <li className={styles.listEl}>
      <div className={styles.cardContentContainer} key={list.id}>
        <div className={styles.listContent}>
          <div className={styles.listHeader}>
            {showNewTitleInput ? (
              <InputForm
                htmlId={'changeListTitle'}
                onChange={handleNewTitleChange}
                value={list.title}
                onSubmit={handleTitleSubmit}
              />
            ) : (
              <h2 onClick={() => setShowNewTitleInput(true)}>{list.title}</h2>
            )}
            <button onClick={handleDeleteList} className={styles.cardOptionsButton}>
              del
            </button>
          </div>
          <ul className={styles.cardsContainer}>
            {showNewCardInput ? (
              <InputForm
                htmlId={'addCard'}
                onChange={handleCardInputChange}
                placeholder={'Enter a title for this card...'}
                onSubmit={handleCardSubmit}
              />
            ) : (
              <button className={styles.addCard} onClick={() => setShowNewCardInput(true)}>
                Add a card
              </button>
            )}
            {list.cards.map(card => (
              <Card key={card.id} dispatch={dispatch} {...card} list_id={list.id} />
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}
