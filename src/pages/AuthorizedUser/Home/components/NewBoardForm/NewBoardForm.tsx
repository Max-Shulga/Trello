import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import useEnter from '../../../../../common/hooks/useEnter';
import useEscape from '../../../../../common/hooks/useEscape';
import { IHomeBoard } from '../../../../../common/interfaces/IHomeBoard';
import { useAppDispatch } from '../../../../../store/hooks';
import { addBoard } from '../../../../../store/reducers/actions';
import BoardNameValidationInfo from '../../../../../ui/BoardNameValidationInfo/BoardNameValidationInfo';
import styles from './BoardForm.module.scss';
import BoardBGPreview from './components/BoardBGPreview';
import BoardFormHeader from './components/BoardFormHeader';
import ColorPicker from './components/ColorPicker/ColorPicker';

interface IProps {
  onClick: () => void
}

function NewBoardForm({ onClick }: IProps) :React.JSX.Element {
  const dispatch = useAppDispatch();
  const [boardColor, setBoardColor] = useState('transparent'); // State для цвета доски

  const {
    register,
    handleSubmit,
    formState,
    setValue,
    getValues,
  } = useForm<IHomeBoard>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      custom: {
        color: 'transparent',
      },
    },
  });
  const setNewBoardTitle = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setValue('title', e.target.value);
  };
  const setNewBoardBgColor = (e: React.MouseEvent<HTMLInputElement, MouseEvent>):void => {
    const target = e.target as HTMLInputElement;
    setBoardColor(target.value);
    setValue('custom.color', target.value);
  };

  const closeForm = ():void => {
    onClick();
  };
  const submitForm = ():void => {
    const formData = getValues();
    dispatch(addBoard(formData));
    closeForm();
  };
  useEscape(closeForm);
  useEnter(handleSubmit(submitForm));

  return (
    <div className={styles.dropMenuContainer}>
      <div className={styles.newBoardContainer}>
        <section className={styles.newSubBoardContainer}>
          <form
            name="newBoard"
            className={styles.form}
            onSubmit={handleSubmit(submitForm)}
            noValidate
          >
            <BoardFormHeader onClose={closeForm} />
            <BoardBGPreview color={boardColor} />
            <div className={styles.bgPickerContainer}>
              <p>Background</p>
              <ColorPicker onClick={setNewBoardBgColor} />
            </div>
            <div>
              <label className={styles.titleInputContainer}>
                <p>
                  Board title
                  {' '}
                  <span>*</span>
                </p>
                <div className={styles.notValid}>
                  <input
                    type="text"
                    className={styles.input}
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
                    onBlur={setNewBoardTitle}
                  />
                  {formState.errors.title?.message && <BoardNameValidationInfo right="20px" />}
                </div>
                {formState.errors.title?.message && (
                  <div className={styles.notValid}>
                    <p>{formState.errors.title?.message}</p>
                  </div>
                )}
              </label>
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
        </section>
      </div>
    </div>
  );
}
export default NewBoardForm;
