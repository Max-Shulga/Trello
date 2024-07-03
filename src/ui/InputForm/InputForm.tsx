import React, {
  InputHTMLAttributes, useEffect,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import BoardNameValidationInfo from '../BoardNameValidationInfo/BoardNameValidationInfo';
import styles from './InputForm.module.scss';

interface InputFormProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  htmlId: string
  value?: string
  onSubmit: SubmitHandler<FormValues>
  className?: string
  validationPattern?: RegExp
  width?:string
  height?:string
}

type FormValues = {
  title: string
};

function InputForm({
  htmlId,
  onSubmit,
  value = '',
  validationPattern = /.*/,
  className = '',
  width,
  height,
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
          style={{ width: `${width}`, height: `${height}` }}
          {...register('title', {
            required: true,
            pattern: validationPattern || /.*/,
          })}
          {...rest}
        />
        {formState.errors.title && <BoardNameValidationInfo right="5px" />}
      </label>
      <button type="submit" style={{ display: 'none' }}>Submit</button>

    </form>
  );
}

export default InputForm;
