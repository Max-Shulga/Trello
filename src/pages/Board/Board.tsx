import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'
import List from './components/List/List.tsx'
import styles from './Board.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { changeBoardTitle, deleteBoard, getBoard, loadBoard } from '../../features/BoardSlice.ts'
import { ChangeEvent, useEffect, useState } from 'react'
import InputForm from '../../components/InputForm/InputForm.tsx'
import { AppDispatch } from '../../app/store.ts'
import NewListCreator from './components/NewListCreator/NewListCreator.tsx'
import { BoardTitleValidator } from '../../common/constants/BoardTitleValidator.ts'
import { AxiosError } from 'axios'
import { toastr } from 'react-redux-toastr'
import { unwrapResult } from '@reduxjs/toolkit'

export const Board = () => {
  const { id: idString } = useParams<string>() as {
    id: string
  }
  const id = +idString
  const { title, lists, custom, isLoading } = useAppSelector(getBoard)
  const [showBoardCreateForm, setShowBoardCreateForm] = useState(false)
  const [showNewTitleInput, setShowNewTitleInput] = useState(false)
  const dispatch: AppDispatch = useAppDispatch()
  const [newTitleData, setNewTitleData] = useState('')
  const createNewCardText = lists.length > 0 ? 'Add another list' : 'Add a list'
  const navigate = useNavigate()

  const handleApiError = (error: AxiosError) => {
    if (error.response) {
      toastr.error('Response error', 'Check network')
    } else if (error.request) {
      toastr.error('Request error', 'Check network')
    } else {
      toastr.error('Error', error.message)
    }
  }

  useEffect(() => {
    dispatch(loadBoard(id))
      .then(unwrapResult)
      .catch(e => {
        handleApiError(e)
      })
  }, [id, dispatch])

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setNewTitleData(newTitle)
  }

  const handleOnSubmit = () => {
    if (newTitleData.trim()) dispatch(changeBoardTitle(newTitleData))

    setShowNewTitleInput(false)
  }

  const handleDelete = () => {
    dispatch(deleteBoard())
    navigate('/')
  }
  if (isLoading) {
    return <img className={styles.loading} src='/assets/icon-spinner.gif' alt='loading spinner' />
  }
  return (
    <div style={{ background: custom.color }} className={styles.boardContainer}>
      <div className={styles.headerContainer}>
        <div onClick={() => setShowNewTitleInput(true)} className={styles.title}>
          {showNewTitleInput ? (
            <InputForm
              htmlFor={'changeBoardName'}
              onChange={handleInputValue}
              value={title}
              onSubmit={handleOnSubmit}
              validationPattern={BoardTitleValidator}
            />
          ) : (
            title
          )}
        </div>
        <button onClick={handleDelete} className={styles.delBoardButton}>
          del
        </button>
      </div>
      <ul className={styles.cardsListContainer}>
        {lists.map(list => (
          <List key={list.id} list={list} dispatch={dispatch} />
        ))}
        <li className={styles.addCard}>
          {showBoardCreateForm ? (
            <NewListCreator
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
