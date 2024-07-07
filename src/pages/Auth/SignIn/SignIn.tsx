import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { ISignIn } from '../../../common/interfaces/ISignIn';
import routesNames from '../../../routes/routes.names';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { signIn } from '../../../store/reducers/actions';
import Button from '../../../ui/Button/Button';
import Input from '../components/Input/Input';
import styles from '../Sign.module.scss';

function SignIn():React.ReactElement {
  const {
    register, handleSubmit, reset, formState: { errors }, getValues,
  } = useForm<ISignIn>({
    mode: 'onBlur',
  });
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);
  const submitForm = async ():Promise<void> => {
    const newUserData:ISignIn = {
      email: getValues().email,
      password: getValues().password,
    };
    await dispatch(signIn(newUserData));

    if (error === 401) {
      setMessage('Incorrect login or password');
      reset();
    }
    navigate(routesNames.HOME);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(submitForm)}>
      <fieldset>
        <legend className={styles.formHeader}>
          <h2>Sign in</h2>
        </legend>
        <div className={styles.formBody}>
          <Input
            inputName="email"
            type="text"
            {...register('email', {
              required: {
                value: true,
                message: 'This field is required',
              },
            })}
            placeholder="Enter your login or email address"
            error={message || errors.email?.message}
          />
          <Input
            inputName="password"
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'This field is required',
              },
            })}
            placeholder="Enter your password"
            error={message || errors.password?.message}
          />
          <Link to="/auth/sign-up">Don&apos;t have an account? Register here</Link>
          <Button type="submit" className={styles.submitButton}>Sign in</Button>
        </div>
      </fieldset>
    </form>
  );
}
export default SignIn;
