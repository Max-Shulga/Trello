import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { changeCardData } from '../../../../store/reducers/actions';
import Button from '../../../../ui/Button/Button';
import styles from './CardModalDescription.module.scss';

function CardModalDescription() :React.JSX.Element {
  const { description, id } = useAppSelector((state) => state.board.selectedCard);
  const [newDescription, setNewDescription] = useState(description);
  const { id: listId } = useAppSelector((state) => state.board.selectedList);
  const [showInput, setShowInput] = useState(false);
  const dispatch = useAppDispatch();
  const { id: boardId } = useParams();
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>):void => {
    setNewDescription(e.target.value);
  };
  useEffect(() => {
    setNewDescription(description);
  }, [description]);

  const handleChangeDescriptionSubmit = ():void => {
    dispatch(changeCardData(
      {
        boardId: Number(boardId),
        cardData: { list_id: listId, id, description: newDescription },
      },
    ));
    setShowInput(false);
  };
  const handleButtonCLick = ():void => {
    if (showInput) {
      handleChangeDescriptionSubmit();
    }
    setShowInput(!showInput);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3>Description</h3>
        <Button
          type="button"
          onClick={handleButtonCLick}
        >
          Change
        </Button>
      </div>
      {!showInput

        ? <p className={styles.text}>{description}</p>
        : (
          <textarea
            onSubmit={handleChangeDescriptionSubmit}
            onChange={handleDescriptionChange}
            onBlur={handleChangeDescriptionSubmit}
            value={newDescription}
            className={styles.textArea}
          />
        )}
    </section>
  );
}
export default CardModalDescription;
