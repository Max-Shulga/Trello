import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import emailRegex from '../../../common/constants/emailRegex';
import passwordRegex from '../../../common/constants/passwordRegex';
import { ISignIn } from '../../../common/interfaces/ISignIn';
import ISignUp from '../../../common/interfaces/ISignUp';
import routesNames from '../../../routes/routes.names';
import { useAppDispatch } from '../../../store/hooks';
import { signIn, signUp } from '../../../store/reducers/actions';
import Button from '../../../ui/Button/Button';
import Input from '../components/Input/Input';
import styles from '../Sign.module.scss';

function SignUp():React.ReactElement {
  const {
    register, handleSubmit, formState: { errors }, getValues,
  } = useForm<ISignUp>({
    mode: 'onBlur',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitForm = async ():Promise<void> => {
    const newUserData:ISignIn = {
      email: getValues().email,
      password: getValues().password,
    };
    await dispatch(signUp(newUserData));
    await dispatch(signIn(newUserData));
    navigate(routesNames.HOME);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(submitForm)}>
      <fieldset>

        <legend className={styles.formHeader}>
          <h2>Sign up</h2>
        </legend>

        <div className={styles.formBody}>
          <Input
            inputName="email"
            type="text"
            {...register('email', {
              pattern: {
                value: emailRegex,
                message: 'Please enter a valid email',
              },
              required: {
                value: true,
                message: 'This field is required',
              },
            })}
            placeholder="Enter your email address"
            error={errors.email?.message}
          />
          <Input
            inputName="password"
            type="password"
            {...register('password', {
              pattern: {
                value: passwordRegex,
                message: 'Password must be at least 8 characters long and contain uppercase letter digit.',
              },
              required: {
                value: true,
                message: 'This field is required',
              },
            })}
            placeholder="Enter your password"
            error={errors.password?.message}
          />
          <Input
            inputName="confirm-password"
            type="password"
            {...register('confirmPassword', {
              required: {
                value: true,
                message: 'This field is required',
              },
              validate: (value) => {
                const { password } = getValues();

                return password === value || 'Passwords do not match';
              },
            })}
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
          />
          <Link to="/auth/sign-in">Have an account? Sign in</Link>
          <Button type="submit" className={styles.submitButton}>Sign up</Button>
        </div>
      </fieldset>
    </form>

  );
}
export default SignUp;
