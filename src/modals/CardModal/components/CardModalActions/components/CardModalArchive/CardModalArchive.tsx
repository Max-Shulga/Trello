import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import { deleteCard } from '../../../../../../store/reducers/actions';
import Button from '../../../../../../ui/Button/Button';
import styles from '../../CardModalActions.module.scss';

function CardModalArchive():React.JSX.Element {
  const { selectedCard, board } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDelete = () :void => {
    (async ():Promise<void> => {
      await dispatch(deleteCard({ cardId: selectedCard.id, boardId: board.boardId }));
      navigate('../');
    })();
  };

  return (
    <Button className={styles.archive} onClick={handleDelete}>Archive</Button>
  );
}

export default CardModalArchive;
