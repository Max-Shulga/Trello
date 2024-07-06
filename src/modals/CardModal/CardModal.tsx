import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import closeIcon from '../../assets/closeIcon.svg';
import useEscape from '../../common/hooks/useEscape';
import useOutsideClick from '../../common/hooks/useOutsideClick';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCardById, resetSelectedCardData } from '../../store/reducers/board/boardSlice';
import Loader from '../../ui/Loader/Loader';
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
  const cardModalRef = useRef<HTMLDivElement>(null);
  const handleOnClose = ():void => {
    navigate(-1);
  };
  const { isLoading } = useAppSelector((state) => state.board);
  useEffect(() => {
    dispatch(getCardById(Number(cardId)));

    return ():void => {
      dispatch(resetSelectedCardData());
    };
  }, [dispatch, cardId]);

  useOutsideClick(cardModalRef, handleOnClose);
  useEscape(handleOnClose);

  return (
    <section className={styles.wrapper}>
      {isLoading && <Loader />}
      <ModalMenuContainer ref={cardModalRef}>
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
