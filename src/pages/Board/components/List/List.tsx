import styles from './List.module.scss'
import Card from '../Card/Card..tsx'
import React, { ChangeEvent, useState } from 'react'
import InputForm from '../../../../components/InputForm/InputForm.tsx'
import { addCard, changeListData } from '../../../../features/BoardSlice.ts'
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
  })

  const [newCard, setNewCard] = useState<IChangeCardDataPayload>({
    list_id: list.id,
    title: '',
    position: position,
  })

  const handleNewTitleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setNewListTitle({
      ...newListTitle,
      title: newTitle,
    })
  }

  const handleChangeTitleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setShowNewTitleInput(false)
    if (newListTitle.title) {
      e.preventDefault()
      dispatch(changeListData(newListTitle))
    }
  }

  const handleAddCardOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCardValue = e.target.value
    setNewCard({
      ...newCard,
      title: newCardValue,
    })
  }
  const handleAddCardOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setShowNewCardInput(false)
    if (newCard.title) {
      e.preventDefault()
      dispatch(addCard(newCard))
    }
  }
  return (
    <li className={styles.listEl}>
      <div className={styles.cardContentContainer} key={list.id}>
        <div className={styles.listContent}>
          <div className={styles.listHeader}>
            {showNewTitleInput ? (
              <InputForm
                htmlFor={'changeListTitle'}
                onChange={handleNewTitleOnChange}
                value={list.title}
                onSubmit={handleChangeTitleOnSubmit}
              />
            ) : (
              <h2 onClick={() => setShowNewTitleInput(true)}>{list.title}</h2>
            )}
            <button className={styles.cardOptionsButton}></button>
          </div>
          <ul className={styles.cardsContainer}>
            {showNewCardInput ? (
              <InputForm
                htmlFor={'addCard'}
                onChange={handleAddCardOnChange}
                placeholder={'Enter a title for this card...'}
                onSubmit={handleAddCardOnSubmit}
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
