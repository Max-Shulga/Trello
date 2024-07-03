import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import closeIcon from '../../../../../assets/closeIcon.svg';
import { IChangeListDataPayload } from '../../../../../common/types/IChangeListDataPayload';
import { useAppDispatch } from '../../../../../store/hooks';
import { addList } from '../../../../../store/reducers/actions';
import InputForm from '../../../../../ui/InputForm/InputForm';
import styles from './NewListCreator.module.scss';

interface NewListCreatorProps {
  position: number
  onClick: React.Dispatch<React.SetStateAction<boolean>>
}

function NewListCreator(params: NewListCreatorProps):React.JSX.Element {
  const {
    position, onClick,
  } = params;
  const [newListData, setNewListData] = useState<IChangeListDataPayload>({
    title: '',
    position,
  });
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setNewListData({ ...newListData, title: e.target.value });
  };
  const handleSubmit = () :void => {
    if (newListData.title) {
      dispatch(addList({ listData: newListData, boardId: Number(id) }));
    }
    onClick(false);
  };

  return (
    <div className={styles.form}>
      <InputForm
        htmlId="CardName"
        onChange={handleInputChange}
        placeholder="Enter list title..."
        onSubmit={handleSubmit}
      />
      <div className={styles.buttonsContainer}>

        <button className={styles.submitButton} type="submit" form="CardName">
          Add list
        </button>
        <button type="button" className={styles.closeButton} onClick={() => onClick(false)}>
          <img src={closeIcon} alt="close icon" />
        </button>
      </div>
    </div>
  );
}
export default NewListCreator;
