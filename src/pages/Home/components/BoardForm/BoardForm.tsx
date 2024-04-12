import styles from './BoardForm.module.scss'
import { useState } from 'react'
import ColorButtons from '../../../../components/ColorButtons/ColorButtons.tsx'
import { addBoard } from '../../../../features/HomeBoardsSlice.ts'
import { newBoardCreatorPresetBoard } from '../../../../assets/newBoardCreatorPresetBoard.tsx'
import { closeIcon } from '../../../../assets/closeIcon.tsx'
import { mainBgColors } from '../../../../common/constants/mainBgColors.ts'
import { dropMenuBgColors } from '../../../../common/constants/dropMenuBgColors.ts'
import { useForm } from 'react-hook-form'
import { IHomeBoard } from '../../../../common/interfaces/IHomeBoard.ts'
import { AppDispatch } from '../../../../app/store.ts'
import { BoardNameValidationInfo } from '../../../../components/BoardNameValidationInfo/BoardNameValidationInfo.tsx'

interface IProps {
  onClick: () => void
  dispatch: AppDispatch
}

export default function BoardForm({ onClick, dispatch }: IProps) {
  const [boardSettings, setBoardSettings] = useState({
    custom: {
      color: 'transparent',
    },
  })
  const [showMoreColors, setShowMoreColors] = useState(false)

  const { register, handleSubmit, formState } = useForm<IHomeBoard>()
  const selectBoardColor = (color: string, button: HTMLButtonElement) => {
    document.querySelectorAll(`.${styles.acceptEffect}`).forEach(btn => {
      btn.classList.remove(styles.acceptEffect)
    })
    button.classList.add(styles.acceptEffect)
    setBoardSettings({
      custom: {
        color: color,
      },
    })
  }

  const closeForm = () => {
    onClick()
  }

  const submitForm = (data: IHomeBoard) => {
    dispatch(
      addBoard({
        ...data,
        ...boardSettings,
      }),
    )
    closeForm()
  }

  return (
    <div className={styles.dropMenuContainer}>
      <section className={styles.newBoardContainer}>
        <header className={styles.header}>
          <h2>Create board</h2>
          <button className={styles.closeButton} onClick={closeForm}>
            {closeIcon()}
          </button>
        </header>
        <div className={styles.contentContainer}>
          <div
            className={styles.boardPreViewer}
            style={{ background: boardSettings.custom.color }}
          >
            {newBoardCreatorPresetBoard()}
          </div>
          <form
            name={'newBoard'}
            className={styles.form}
            onSubmit={handleSubmit(submitForm)}
            noValidate
          >
            <div className={styles.bgPickerContainer}>
              <p>Background</p>
              <div className={styles.backgroundPicker}>
                <ul className={styles.presetColorsList}>
                  <ColorButtons
                    colors={mainBgColors}
                    onClick={selectBoardColor}
                    className={styles.colorPikerElement}
                  />
                  <li
                    className={`${styles.colorPikerElement} ${showMoreColors ? '' : styles.moreEffect} ${styles.moreEffectContainer}`}
                    onClick={() => setShowMoreColors(!showMoreColors)}
                  >
                    <button type={'button'} />
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <label className={styles.titleInputContainer}>
                Board title <span>*</span>
              </label>
              <input
                type='text'
                {...register('title', {
                  required: {
                    value: true,
                    message: '👋 Board title is required',
                  },
                  pattern: {
                    value: /^(?!\s*$)[0-9\p{L}\s._-]+$/u,
                    message: `Invalid board name format`,
                  },
                })}
              />
              {formState.errors.title?.message && (
                <div className={styles.notValid}>
                  <p>{formState.errors.title?.message}</p>
                  <BoardNameValidationInfo />
                </div>
              )}
            </div>
            <button
              type={'submit'}
              className={`
                ${!formState.errors.title ? styles.createButton : styles.createButtonDisabled}
                `}
            >
              Create
            </button>
          </form>
        </div>
      </section>
      {showMoreColors && (
        <ul className={styles.colorsDropMenu}>
          <ColorButtons
            className={''}
            onClick={selectBoardColor}
            colors={dropMenuBgColors}
          />
        </ul>
      )}
    </div>
  )
}
