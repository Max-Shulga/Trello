import styles from './List.module.scss'
import { IListServerResponse } from '../../../../common/interfaces/IList.ts'
import Card from '../Card/Card..tsx'
import React, { ChangeEvent, useState } from 'react'
import InputForm from '../../../../components/InputForm/InputForm.tsx'
import { changeListTitle } from '../../../../features/BoardSlice.ts'
import { AppDispatch } from '../../../../app/store.ts'

interface ListProps {
  list: IListServerResponse
  boardID: number
  dispatch:AppDispatch
}

export default function List(props: ListProps) {
  const [showNewTitleInput, setShowNewTitleInput] = useState(false)
  const [showNewCardInput, setShowNewCardInput] = useState(false)
  const { list, boardID,dispatch } = props
  // const dispatch = useAppDispatch()

  const [newListTitle, setNewListTitle] = useState({
    boardId: boardID,
    listId: list.id,
    title: '',
    position: list.position,
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
    if (newListTitle.title){
      e.preventDefault()
      dispatch(changeListTitle(newListTitle))
      console.log(123)
    }
  }

  return (
    <li className={styles.listEl}>
      <div className={styles.cardContentContainer} key={list.id}>
        <div className={styles.listContent}>
          <div className={styles.listHeader}>
            {showNewTitleInput ? (
              <form name='changeListTitle' onSubmit={handleChangeTitleOnSubmit} onBlur={handleChangeTitleOnSubmit}>
                <label htmlFor='changeListTitle'></label>
                <InputForm htmlFor={'changeListTitle'} onChange={handleNewTitleOnChange}  value={list.title} />
              </form>
            ) : (
              <h2 onClick={() => setShowNewTitleInput(true)}>{list.title}</h2>
            )}
            {list.cards.map(card => (
              <Card key={card.id} title={card.title} />
            ))}
          </div>
          <button className={styles.cardOptionsButton}></button>

          {showNewCardInput ? (
            <form name='addCard' className={styles.cardInputContainer}>
              <label htmlFor='addCard'>
                <InputForm
                  htmlFor={'addCard'}
                  onChange={() => null}
                  placeholder={'Enter a title for this card...'}
                />
              </label>
            </form>
          ) : (
            <button className={styles.addCard} onClick={() => setShowNewCardInput(true)}>
              Add a card
            </button>
          )}
        </div>
      </div>
    </li>
  )
}
