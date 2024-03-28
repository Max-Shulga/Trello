import styles from './NewBoardCreator.module.scss'
import React, { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../../../app/hooks.ts'
import ColorList from '../../../../components/СolorList/ColorList.tsx'
import { addBoard } from '../../../../features/HomeBoardsSlice.ts'
import { newBoardCreatorPresetBoard } from '../../../../assets/newBoardCreatorPresetBoard.tsx'
import { closeIcon } from '../../../../assets/closeIcon.tsx'

interface IProps {
  onClick: () => void
}

export default function NewBoardCreator({ onClick }: IProps) {
  const [newBoardData, setNewBoardData] = useState({
    title: '',
    custom: {
      color: 'transparent',
    },
  })

  const dispatch = useAppDispatch()

  const handleBoardPreviewBGChange = (color: string) => {

    setNewBoardData({
      ...newBoardData,
      custom: {
        color: color,
      },
    })
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setNewBoardData({
      ...newBoardData,
      title: inputValue,
    })
  }
  const handleCloseNewBoardCreator = () => {
    onClick()
  }

  const handleCreateNewBoardButtonClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addBoard(newBoardData))
  }

  return (
    <div className={styles.dropMenuContainer}>
      <section className={styles.newBoardContainer}>
        <header className={styles.header}>
          <h2>Create board</h2>
          <button className={styles.closeButton} onClick={handleCloseNewBoardCreator}>
            {closeIcon()}
          </button>
        </header>
        <div className={styles.contentContainer}>
          <div className={styles.boardPreViewer} style={{ background: newBoardData.custom.color }}>
            {newBoardCreatorPresetBoard()}
          </div>
          <div className={styles.bgPickerContainer}>
            <p>Background</p>
            <div className={styles.backgroundPicker}>
              <ul className={styles.presetColorsList}>
                <ColorList onClick={handleBoardPreviewBGChange} />
              </ul>
            </div>
          </div>
          <form className={styles.form} onSubmit={e => handleCreateNewBoardButtonClick(e)}>
            <div>
              <label className={styles.titleInputContainer}>
                <h4>
                  Board title <span>*</span>
                </h4>
                <input
                  type='text'
                  onChange={handleInputChange}
                  required={true}
                  placeholder={newBoardData.title}
                />
                {!newBoardData.title && (
                  <div>
                    <p>
                      <span>👋</span> Board title is required
                    </p>
                  </div>
                )}
              </label>
            </div>
            <button
              type={'submit'}
              className={`${!newBoardData.title ? styles.createButtonDisabled : styles.createButton}`}
            >
              Create
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}