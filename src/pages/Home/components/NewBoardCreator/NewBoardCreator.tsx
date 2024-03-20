import styles from './NewBoardCreator.module.scss'
import React, { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../../../app/hooks.ts'
import ColorList from '../../../../components/colorList/ColorList.tsx'
import { addBoard } from '../../../../features/boardsSlice.ts'

interface IProps {
  onClick: () => void
}

export default function NewBoardCreator({ onClick }: IProps) {
  const [beforeHidden, setBeforeHidden] = useState(false)
  const [showAllColors, setShowAllColors] = useState(false)
  const [newBoardData, setNewBoardData] = useState({
    title: '',
    custom: {
      bgColor: 'transparent',
    },
  })

  const dispatch = useAppDispatch()

  const mainBGColors: { background: string }[] = [
    { background: 'linear-gradient(151deg, rgb(160, 222, 219), rgb(3, 165, 209))' },
    { background: 'linear-gradient(450deg, rgb(62, 25, 113), rgb(72, 105, 206))' },
    { background: 'linear-gradient(349deg, rgb(223, 90, 189), rgb(140, 2, 153))' },
    { background: 'linear-gradient(205deg, rgb(237, 228, 100), rgb(252, 152, 51))' },
    { background: 'linear-gradient(353deg, rgb(182, 244, 85), rgb(63, 128, 87))' },
  ]

  const allBGColors: { background: string }[] = [
    { background: '#0079bf' },
    { background: '#d29034' },
    { background: '#519839' },
    { background: '#b04632' },
    { background: '#89609e' },
    { background: '#cd5a91' },
    { background: '#4bbf6b' },
    { background: '#00aecc' },
    { background: '#838c91' },
  ]

  const handleBoardPreviewBGChange = (color: string) => {
    setNewBoardData({
      ...newBoardData,
      custom: {
        bgColor: color,
      },
    })
  }

  const handleShowAllColorsButton = () => {
    setBeforeHidden(!beforeHidden)
    setShowAllColors(!showAllColors)
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

  const handleCreateNewBoardButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newBoardData.title) return;

    dispatch(addBoard(newBoardData))
        .then((response) => {
          console.log('addBoard.fulfilled:', response.payload);
        })
        .catch((error) => {
          console.log('addBoard.rejected:', error.payload);
        });
  };

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
            style={{ background: newBoardData.custom.bgColor }}
          >
            <img src='./../../../../assets/newBoardCreatorPresetBoard.svg' alt='board preset' />
          </div>
          <div className={styles.bgPickerContainer}>
            <p>Background</p>
            <div className={styles.backgroundPicker}>
              <ul className={styles.presetColorsList}>
                <ColorList listStyles={mainBGColors} onClick={handleBoardPreviewBGChange} />
                <li
                  className={`${styles.showAllColorsButton} ${beforeHidden ? '' : styles.moreEffect}`}
                  onClick={handleShowAllColorsButton}
                >
                  <button />
                </li>
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
      {showAllColors && (
        <div className={styles.allColorsDropMenuContainer}>
          <h4>Colors</h4>
          <ul className={styles.allColorsList}>
            {<ColorList listStyles={allBGColors} onClick={handleBoardPreviewBGChange} />}
          </ul>
        </div>
      )}
    </div>
  )
}
