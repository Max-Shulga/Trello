import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'
import List from './components/List/List.tsx'
import styles from './Board.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { changeBoardTitle, deleteBoard, getBoard, loadBoard } from '../../features/BoardSlice.ts'
import { ChangeEvent, useEffect, useState } from 'react'
import InputForm from '../../components/InputForm/InputForm.tsx'
import { AppDispatch } from '../../app/store.ts'
import NewListCreator from './components/NewListCreator/NewListCreator.tsx'
import { patternBoardTitle } from '../../common/constants/patternBoardTitle.ts'
import { unwrapResult } from '@reduxjs/toolkit'
import { handleApiError } from '../../api/handleApiError.ts'

export const Board = () => {
  const { id: idString } = useParams<string>() as {
    id: string
  }
  const id = +idString
  const { title, lists, custom, isLoading } = useAppSelector(getBoard)
  const [showListCreateForm, setShowListCreateForm] = useState(false)
  const [showNewTitleInput, setShowNewTitleInput] = useState(false)
  const dispatch: AppDispatch = useAppDispatch()
  const [newTitle, setNewTitle] = useState(title)
  const createNewListText = lists.length > 0 ? 'Add another list' : 'Add a list'
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadBoard(id))
      .then(unwrapResult)
      .catch(e => {
        handleApiError(e)
      })
  }, [id, dispatch])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setNewTitle(newTitle)
  }

  const handleSubmit = () => {
    if (newTitle.trim()) dispatch(changeBoardTitle(newTitle))

    setShowNewTitleInput(false)
  }

  const handleDeleteBoard = () => {
    dispatch(deleteBoard())
    navigate('/')
  }
  if (isLoading) {
    return <img className={styles.loading} src={'/assets/icon-spinner.gif'} alt='loading spinner' />
  }
  return (
    <div style={{ background: custom.color }} className={styles.boardContainer}>
      <div className={styles.headerContainer}>
        <div onClick={() => setShowNewTitleInput(true)} className={styles.title}>
          {showNewTitleInput ? (
            <InputForm
              htmlId={'changeBoardName'}
              onChange={handleInputChange}
              value={title}
              onSubmit={handleSubmit}
              validationPattern={patternBoardTitle}
            />
          ) : (
            title
          )}
        </div>
        <button onClick={handleDeleteBoard} className={styles.delBoardButton}>
          del
        </button>
      </div>
      <ul className={styles.cardsListContainer}>
        {lists.map(list => (
          <List key={list.id} list={list} dispatch={dispatch} />
        ))}
        <li className={styles.addCard}>
          {showListCreateForm ? (
            <NewListCreator
              position={lists.length + 1}
              id={id}
              setShowCreateForm={setShowListCreateForm}
            />
          ) : (
            <button
              className={styles.showCreateMenuButton}
              onClick={() => setShowListCreateForm(true)}
            >
              {createNewListText}
            </button>
          )}
        </li>
      </ul>
    </div>
  )
}
