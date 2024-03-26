import React, { ChangeEvent, useState } from 'react'
import InputForm from '../../../../components/InputForm/InputForm.tsx'
import { IList } from '../../../../common/interfaces/IList.ts'
import styles from './NewCardCreator.module.scss'
import { addList } from '../../../../features/BoardSlice.ts'
import { useAppDispatch } from '../../../../app/hooks.ts'

interface INewCardCreator {
  position: number
  id: number
  setShowBoardCreateForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewCardCreator(params: INewCardCreator) {
  const { position, id, setShowBoardCreateForm } = params
  const [newListData, setNewListData] = useState<IList>({
    title: '',
    position: position,

  })
  const dispatch = useAppDispatch()

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewListData({ ...newListData, title: e.target.value })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addList({ ...newListData, id: id }))
    setShowBoardCreateForm(false)
  }

  return (
    <form name='CardName' className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor='CardName' />
      <InputForm
        htmlFor={'CardName'}
        onChange={handleOnChange}
        placeholder={'Enter list title...'}
      />
      <div className={styles.buttonsContainer}>
        <button className={styles.submitButton} type='submit'>
          Add list
        </button>
        <button
          className={styles.closeButton}
          onClick={() => setShowBoardCreateForm(false)}
        ></button>
      </div>
    </form>
  )
}
