import styles from './NewBoardCreator.module.scss'
import React, { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../../../app/hooks.ts'
import ColorList from '../../../../components/СolorList/ColorList.tsx'
import { addBoard } from '../../../../features/HomeBoardsSlice.ts'

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
            <span aria-hidden={true}>
              <svg
                  width={'24px'}
                  height={'24px'}
                  viewBox={'0 0 24 24'}
                  fill={'none'}
                  xmlns={'http://www.w3.org/2000/svg'}
              >
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z'
                    fill='currentColor'
                ></path>
              </svg>
            </span>
            </button>
          </header>
          <div className={styles.contentContainer}>
            <div
                className={styles.boardPreViewer}
                style={{ background: newBoardData.custom.color }}
            >
              <img src='./../../../../assets/newBoardCreatorPresetBoard.svg' alt='board preset' />
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