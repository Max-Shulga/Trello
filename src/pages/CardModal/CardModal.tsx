import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import closeIcon from '../../assets/closeIcon.svg';
import { useAppDispatch } from '../../store/hooks';
import { getCardById, resetSelectedCardData } from '../../store/reducers/board/boardSlice';
import ModalMenuContainer from '../../ui/ModalContainer/ModalMenuContainer';
import styles from './CardModal.module.scss';
import CardModalActions from './components/CardModalActions/CardModalActions';
import CardModalCardTitle from './components/CardModalCardTitle/CardModalCardTitle';
import CardModalDescription from './components/CardModalDescription/CardModalDescription';
import CardModalListTitle from './components/CardModalListTitle/CardModalListTitle';
import CardModalMembers from './components/CardModalMembers/CardModalMembers';

function CardModal():React.JSX.Element {
  const params = useParams();

  const { cardId } = params;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnClose = ():void => {
    navigate('../');
  };
  const handleEscClose = (event: KeyboardEvent):void => {
    if (event.key === 'Escape') {
      handleOnClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleEscClose);
    dispatch(getCardById(Number(cardId)));

    return ():void => {
      dispatch(resetSelectedCardData());
    };
  }, [dispatch, cardId]);

  return (
    <section className={styles.wrapper}>
      <ModalMenuContainer>
        <>
          <section className={styles.headerContainer}>
            <CardModalCardTitle />
            <button type="button" onClick={handleOnClose}>
              <img src={closeIcon} alt="cross" />
            </button>
          </section>
          <div className={styles.cardModalSubContainer}>
            <div className={styles.cardInfo}>
              <CardModalListTitle />
              <CardModalMembers />
              <CardModalDescription />
            </div>
            <CardModalActions />
          </div>
        </>
      </ModalMenuContainer>
    </section>
  );
}

export default CardModal;
