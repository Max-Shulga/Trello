import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'
import List from './components/List/List.tsx'
import styles from './Board.module.scss'
import { useParams } from 'react-router-dom'
import { changeBoardTitle, getBoard, loadBoard } from '../../features/BoardSlice.ts'
import React, { ChangeEvent, useEffect, useState } from 'react'
import InputForm from '../../components/InputForm/InputForm.tsx'
import NewCardCreator from './components/NewCardCreator/NewCardCreator.tsx'
import { AppDispatch } from '../../app/store.ts'

export const Board = () => {
  const { id:idString } = useParams<string>() as {
    id: string
  }
  const id = +idString
  const { title, lists, custom, isLoading } = useAppSelector(getBoard)
  const [showBoardCreateForm, setShowBoardCreateForm] = useState(false)
  const [showNewTitleInput, setShowNewTitleInput] = useState(false)
  const dispatch:AppDispatch = useAppDispatch()
  const [newTitleData, setNewTitleData] = useState({
    id: id,
    title: '',
    custom: {},
  })
  const createNewCardText = lists.length > 0 ? 'Add another list' : 'Add a list'
  useEffect(() => {
    setNewTitleData(prevData => ({
      ...prevData,
      id: id,
    }));
  }, [id]);

  useEffect(() => {
    dispatch(loadBoard(id))
  }, [id, dispatch])

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setNewTitleData({
      ...newTitleData,
      title: newTitle,
    })
  }
  const handleOnSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>,
  ) => {
    if (newTitleData.title) {
      event.preventDefault()
      dispatch(changeBoardTitle(newTitleData))
    }
    setShowNewTitleInput(false)
  }
  const changeTitleForm = () => (
    <form name='changeBoardName' onSubmit={handleOnSubmit} onBlur={handleOnSubmit}>
      <label htmlFor='changeBoardName' />
      <InputForm htmlFor={'changeBoardName'} onChange={handleInputValue} value={title} />
    </form>
  )

  if (isLoading) {
    return <div>Loading... </div>
  }else {
    console.log(lists)
  }

  return (
    <div style={{ background: custom.color }} className={styles.boardContainer}>
      <div onClick={() => setShowNewTitleInput(true)} className={styles.title}>
        {showNewTitleInput ? changeTitleForm() : title}
      </div>
      <ul className={styles.cardsListContainer}>
        {lists.map(list => (
          <List key={list.id} list={list}  boardID={id} dispatch={dispatch}/>
        ))}
        <li className={styles.addCard}>
          {showBoardCreateForm ? (
            <NewCardCreator
              position={lists.length + 1}
              id={id}
              setShowBoardCreateForm={setShowBoardCreateForm}
            />
          ) : (
            <button
              className={styles.showCreateMenuButton}
              onClick={() => setShowBoardCreateForm(true)}
            >
              {createNewCardText}
            </button>
          )}
        </li>
      </ul>
    </div>
  )
}
