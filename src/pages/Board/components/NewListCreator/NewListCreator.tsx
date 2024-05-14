import React, { ChangeEvent, useState } from 'react';

import { closeIcon } from '../../../../assets/closeIcon';
import { IChangeListDataPayload } from '../../../../common/types/IChangeListDataPayload';
import InputForm from '../../../../components/InputForm/InputForm';
import { addList } from '../../../../store/actions';
import { useAppDispatch } from '../../../../store/hooks';
import styles from './NewListCreator.module.scss';

interface NewListCreatorProps {
  position: number
  setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>
}

function NewListCreator(params: NewListCreatorProps):React.JSX.Element {
  const {
    position, setShowCreateForm,
  } = params;
  const [newListData, setNewListData] = useState<IChangeListDataPayload>({
    title: '',
    position,
  });
  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setNewListData({ ...newListData, title: e.target.value });
  };
  const handleSubmit = () :void => {
    if (newListData.title) {
      dispatch(addList(newListData));
    }
    setShowCreateForm(false);
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
        <button type="button" className={styles.closeButton} onClick={() => setShowCreateForm(false)}>
          {closeIcon()}
        </button>
      </div>
    </div>
  );
}
export default NewListCreator;
