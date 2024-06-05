import React, {
  ChangeEvent, InputHTMLAttributes, useEffect,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { RegexPattern } from '../../common/types/RegexPattern';
import BoardNameValidationInfo from '../BoardNameValidationInfo/BoardNameValidationInfo';
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

function InputForm({
  htmlId,
  onChange,
  onSubmit,
  value = '',
  validationPattern = /.*/,
  className = '',
  ...rest
}: Readonly<InputFormProps>): React.JSX.Element {
  const {
    register,
    handleSubmit,
    setFocus,
    formState,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      title: value,
    },
  });

  const handleFormSubmit: SubmitHandler<FormValues> = ({ title }) => {
    onSubmit({ title });
  };

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e);
  };

  return (
    <form
      id={htmlId}
      name={htmlId}
      onSubmit={handleSubmit(handleFormSubmit)}
      onBlur={handleSubmit(handleFormSubmit)}
      className={className || ''}
    >
      <label className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          {...register('title', {
            required: true,
            pattern: validationPattern || /.*/,
          })}
          onChange={handleChange}
          {...rest}
        />
        {formState.errors.title && <BoardNameValidationInfo right="5px" />}
      </label>
    </form>
  );
}

export default InputForm;
