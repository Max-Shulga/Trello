import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { closeIcon } from '../../../../assets/closeIcon';
import { newBoardCreatorPresetBoard } from '../../../../assets/newBoardCreatorPresetBoard';
import { dropMenuBgColors } from '../../../../common/constants/dropMenuBgColors';
import { mainBgColors } from '../../../../common/constants/mainBgColors';
import { IHomeBoard } from '../../../../common/interfaces/IHomeBoard';
import { BoardNameValidationInfo } from '../../../../components/BoardNameValidationInfo/BoardNameValidationInfo';
import ColorButtons from '../../../../components/ColorButtons/ColorButtons';
import { addBoard } from '../../../../store/actions';
import { useAppDispatch } from '../../../../store/hooks';
import styles from './BoardForm.module.scss';

interface IProps {
  onClick: () => void
}

function BoardForm({ onClick }: IProps) :React.JSX.Element {
  const [boardSettings, setBoardSettings] = useState({
    custom: {
      color: 'transparent',
    },
  });
  const [showMoreColors, setShowMoreColors] = useState(false);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<IHomeBoard>();

  const selectBoardColor = (color: string, button: HTMLButtonElement):void => {
    document.querySelectorAll(`.${styles.acceptEffect}`).forEach((btn) => {
      btn.classList.remove(styles.acceptEffect);
    });
    button.classList.add(styles.acceptEffect);
    setBoardSettings({
      custom: {
        color,
      },
    });
  };

  const closeForm = ():void => {
    onClick();
  };

  const submitForm = (data: IHomeBoard):void => {
    dispatch(
      addBoard({
        ...data,
        ...boardSettings,
      }),
    );
    closeForm();
  };

  return (
    <div className={styles.dropMenuContainer}>
      <section className={styles.newBoardContainer}>
        <header className={styles.header}>
          <h2>Create board</h2>
          <button type="button" className={styles.closeButton} onClick={closeForm}>
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
            name="newBoard"
            className={styles.form}
            onSubmit={handleSubmit(submitForm)}
            noValidate
          >
            <div className={styles.bgPickerContainer}>
              <p>Background</p>
              <div className={styles.backgroundPicker}>
                <div className={styles.presetColorsList}>
                  <ColorButtons
                    colors={mainBgColors}
                    onClick={selectBoardColor}
                    className={styles.colorPikerElement}
                  />
                  <button
                    type="button"
                    className={`${styles.colorPikerElement} ${showMoreColors ? '' : styles.moreEffect} ${styles.moreEffectContainer}`}
                    onClick={() => setShowMoreColors(!showMoreColors)}
                    aria-label="Show More Colors"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className={styles.titleInputContainer}>
                Board title
                {' '}
                <span>*</span>
              </label>
              <input
                type="text"
                {...register('title', {
                  required: {
                    value: true,
                    message: '👋 Board title is required',
                  },
                  pattern: {
                    value: /^(?!\s*$)[0-9\p{L}\s._-]+$/u,
                    message: 'Invalid board name format',
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
              type="submit"
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
            className={styles.colorPikerElement}
            onClick={selectBoardColor}
            colors={dropMenuBgColors}
          />
        </ul>
      )}
    </div>
  );
}
export default BoardForm;
