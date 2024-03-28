import styles from './List.module.scss'
import { IListServerResponse } from '../../../../common/interfaces/IList.ts'
import Card from '../Card/Card..tsx'
import React, { ChangeEvent, useState } from 'react'
import InputForm from '../../../../components/InputForm/InputForm.tsx'
import { addNewCard, changeListTitle } from '../../../../features/BoardSlice.ts'
import { AppDispatch } from '../../../../app/store.ts'

interface ListProps {
  list: IListServerResponse
  boardID: number
  dispatch: AppDispatch
}

export default function List(props: ListProps) {
  const [showNewTitleInput, setShowNewTitleInput] = useState(false)
  const [showNewCardInput, setShowNewCardInput] = useState(false)
  const { list, boardID, dispatch } = props
  const [newListTitle, setNewListTitle] = useState({
    boardId: boardID,
    listId: list.id,
    title: '',
    position: list.position,
  })
  const position = list.cards.length
  const [newCard, setNewCard] = useState({
    boardID: boardID,
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
      dispatch(changeListTitle(newListTitle))
    }
  }

  const handleAddNewCardOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCardValue = e.target.value
    setNewCard({
      ...newCard,
      title: newCardValue,
    })
  }
  const handleAddNewCardOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setShowNewCardInput(false)
    if (newCard.title) {
      e.preventDefault()
      dispatch(addNewCard(newCard))
    }
  }

  return (
    <li className={styles.listEl}>
      <div className={styles.cardContentContainer} key={list.id}>
        <div className={styles.listContent}>
          <div className={styles.listHeader}>
            {showNewTitleInput ? (
              <form
                name='changeListTitle'
                onSubmit={handleChangeTitleOnSubmit}
                onBlur={handleChangeTitleOnSubmit}
              >
                <label htmlFor='changeListTitle'></label>
                <InputForm
                  htmlFor={'changeListTitle'}
                  onChange={handleNewTitleOnChange}
                  value={list.title}
                />
              </form>
            ) : (
              <h2 onClick={() => setShowNewTitleInput(true)}>{list.title}</h2>
            )}
            <button className={styles.cardOptionsButton}></button>
          </div>
          <ul className={styles.cardsContainer}>
            {list.cards.map(card => (
              <Card key={card.id} title={card.title} />
            ))}
            {showNewCardInput ? (
              <form
                name='addCard'
                className={styles.cardInputContainer}
                onSubmit={handleAddNewCardOnSubmit}
                onBlur={handleAddNewCardOnSubmit}
              >
                <label htmlFor='addCard'>
                  <InputForm
                    htmlFor={'addCard'}
                    onChange={handleAddNewCardOnChange}
                    placeholder={'Enter a title for this card...'}
                  />
                </label>
              </form>
            ) : (
              <button className={styles.addCard} onClick={() => setShowNewCardInput(true)}>
                Add a card
              </button>
            )}
          </ul>
        </div>
      </div>
    </li>
  )
}
