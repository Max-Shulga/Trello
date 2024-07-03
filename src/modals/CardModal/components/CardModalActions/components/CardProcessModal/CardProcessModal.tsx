import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import closeIcon from '../../../../../../assets/closeIcon.svg';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import { addCard, deleteCard } from '../../../../../../store/reducers/actions';
import Button from '../../../../../../ui/Button/Button';
import InputForm from '../../../../../../ui/InputForm/InputForm';
import ModalMenuContainer from '../../../../../../ui/ModalContainer/ModalMenuContainer';
import CardLocationSelector from '../CardLocationSelector/CardLocationSelector';
import styles from './CardProcessModal.module.scss';

interface CardModalProps {
  actionType: 'copy' | 'move';
}

function CardProcessModal({ actionType }: CardModalProps): React.JSX.Element {
  const { title: cardTitle } = useAppSelector((state) => state.board.selectedCard);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { boardId } = useAppSelector((state) => state.board.board);
  const { selectedCard, selectedList } = useAppSelector((state) => state.board);
  const [selectBoardId, setSelectBoardId] = useState(boardId);
  const [selectListId, setSelectListId] = useState(selectedList.id);
  const [selectCardPosition, setSelectCardPosition] = useState(selectedCard.position);
  const [cardTitleState, setCardTitleState] = useState(cardTitle);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClose = (): void => {
    setIsMenuOpen(false);
    navigate('../');
  };

  const submitNewTitle: SubmitHandler<{ title: string }> = ({ title }) => {
    setCardTitleState(title);
  };

  const handleSelectBoardId = (id: number): void => {
    setSelectBoardId(id);
  };

  const handleSelectListId = (id: number): void => {
    setSelectListId(id);
  };

  const handleSelectCardPosition = (position: number): void => {
    setSelectCardPosition(position);
  };

  useEffect(() => {
    setCardTitleState(cardTitle);
  }, [cardTitle]);

  const handleSubmit = async (): Promise<void> => {
    switch (actionType) {
      case 'move': {
        await dispatch(
          addCard({
            cardData: {
              ...selectedCard,
              list_id: selectListId,
              title: cardTitleState,
              position: selectCardPosition || 1,
            },
            boardId: selectBoardId,
          }),
        );

        await dispatch(deleteCard({ cardId: selectedCard.id, boardId }));
        break;
      }
      default:
        dispatch(
          addCard({
            cardData: {
              ...selectedCard,
              list_id: selectListId,
              title: cardTitleState,
              position: selectCardPosition || 1,
            },
            boardId: selectBoardId,
          }),
        );
    }

    handleClose();
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return ():void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className={styles.container}>
      <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {actionType === 'copy' ? 'Copy' : 'Move'}
      </Button>
      {isMenuOpen && (
        <ModalMenuContainer ref={modalRef} className={styles.menuContainer}>
          <div className={styles.header}>
            <div />
            <h4>{actionType === 'copy' ? 'Copy card' : 'Move card'}</h4>
            <button type="button" onClick={handleClose}>
              <img src={closeIcon} alt="close icon" width={18} height={18} />
            </button>
          </div>
          <div className={styles.body}>
            {actionType === 'copy' && (
              <>
                <h5>Title</h5>
                <InputForm
                  htmlId="title"
                  value={cardTitle}
                  onSubmit={submitNewTitle}
                  height="50px"
                  width="100%"
                  className={styles.input}
                />
              </>
            )}
          </div>
          <div className={styles.body}>
            <h4>{actionType === 'copy' ? 'Copy to…' : 'Move to…'}</h4>
          </div>
          <CardLocationSelector
            selectBoardId={handleSelectBoardId}
            selectListId={handleSelectListId}
            selectPosition={handleSelectCardPosition}
          />
          <div className={styles.body}>
            <Button
              className={styles.submitButton}
              type="button"
              onClick={handleSubmit}
              aria-label={`${actionType} button`}
            >
              {actionType === 'copy' ? 'Copy card' : 'Move card'}
            </Button>
          </div>
        </ModalMenuContainer>
      )}
    </div>
  );
}

export default CardProcessModal;
