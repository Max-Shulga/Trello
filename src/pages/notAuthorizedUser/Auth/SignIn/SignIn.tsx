import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ISignIn } from '../../../../common/interfaces/ISignIn';
import userRoles from '../../../../common/types/UserRoles';
import { useAppDispatch } from '../../../../store/hooks';
import { userSignIn } from '../../../../store/reducers/actions';
import { setUserRole } from '../../../../store/reducers/user/userSlice';
import Button from '../../../../ui/Button/Button';
import Input from '../components/Input/Input';
import styles from '../Sign.module.scss';

function SignIn():React.ReactElement {
  const {
    register, handleSubmit, formState: { errors }, getValues,
  } = useForm<ISignIn>({
    mode: 'onBlur',
  });
  const dispatch = useAppDispatch();
  const submitForm = async ():Promise<void> => {
    const newUserData:ISignIn = {
      email: getValues().email,
      password: getValues().password,
    };
    await dispatch(userSignIn(newUserData));

    dispatch(setUserRole(userRoles.AUTHORIZED));
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
            error={errors.email?.message}
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
            error={errors.password?.message}
          />
          <Link to="/sign-up">Don&apos;t have an account? Register here</Link>
          <Button type="submit" className={styles.submitButton}>Sign in</Button>
        </div>
      </fieldset>
    </form>
  );
}
export default SignIn;
