import React, { ChangeEvent, useState } from 'react'
import InputForm from '../../../../components/InputForm/InputForm.tsx'
import styles from './NewListCreator.module.scss'
import { addList } from '../../../../features/BoardSlice.ts'
import { useAppDispatch } from '../../../../app/hooks.ts'
import { IChangeListDataPayload } from '../../../../common/types/IChangeListDataPayload.ts'
import { closeIcon } from '../../../../assets/closeIcon.tsx'

interface NewListCreatorProps {
  position: number
  id: number
  setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewListCreator(params: NewListCreatorProps) {
  const { position, id, setShowCreateForm } = params
  const [newListData, setNewListData] = useState<IChangeListDataPayload>({
    title: '',
    position: position,
  })
  const dispatch = useAppDispatch()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewListData({ ...newListData, title: e.target.value })
  }
  const handleSubmit = () => {
    if (newListData.title) {
      dispatch(addList({ title: newListData.title, id: id, position: position }))
    }
    setShowCreateForm(false)
  }

  return (
    <div className={styles.form}>
      <InputForm
        htmlId={'CardName'}
        onChange={handleInputChange}
        placeholder={'Enter list title...'}
        onSubmit={handleSubmit}
      />
    <div className={styles.buttonsContainer}>

      <button className={styles.submitButton} type='submit' form={'CardName'}>
        Add list
      </button>
      <button className={styles.closeButton} onClick={() => setShowCreateForm(false)}>{closeIcon()}</button>
    </div>
    </div>
  )
}
