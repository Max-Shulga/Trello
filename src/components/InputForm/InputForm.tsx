import React, {
  ChangeEvent, InputHTMLAttributes, useEffect, useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { RegexPattern } from '../../common/types/RegexPattern';
import { BoardNameValidationInfo } from '../BoardNameValidationInfo/BoardNameValidationInfo';
import styles from './InputForm.module.scss';

interface InputFormProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit'> {
  htmlId: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
  onSubmit: SubmitHandler<FormValues>
  className?: string
  validationPattern?: RegexPattern
}

type FormValues = {
  title: string
};

function InputForm(props: InputFormProps):React.JSX.Element {
  const {
    htmlId, onChange, onSubmit, validationPattern, className, value, ...rest
  } = props;
  const { register, handleSubmit, setFocus } = useForm<FormValues>();
  const [inputValue, setInputValue] = useState(value || '');
  const [isValid, setIsValid] = useState(false);
  const pattern = validationPattern || /.*/;

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    if (pattern.test(inputValue)) {
      if (!inputValue.trim()) {
        onSubmit({ title: value || '' });
      } else {
        onSubmit(data);
      }
    } else {
      setIsValid(true);
    }
  };

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) :void => {
    setIsValid(false);
    onChange(e);
    setInputValue(e.target.value);
  };

  return (

    <form
      id={htmlId}
      name={htmlId}
      onSubmit={handleSubmit(handleFormSubmit)}
      onBlur={handleSubmit(handleFormSubmit)}
      className={className || ''}
    >
      <label htmlFor={htmlId} className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          {...register('title')}
          onChange={handleChange}
          {...rest}
        />
        {isValid && <BoardNameValidationInfo />}
      </label>
    </form>
  );
}

InputForm.defaultProps = {
  value: '',
  className: '',
  validationPattern: /.*/,
};
export default InputForm;
