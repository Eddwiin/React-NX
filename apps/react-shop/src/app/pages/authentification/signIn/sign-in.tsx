import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataChangedHook, useChange } from '@react-nx/shared/hooks';
import { userSchema } from '@react-nx/shared/schemas';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../helpers/redux-helper';
import { UserAPI, UserAPIKeys } from '../../../shared/interfaces/UserAPI';
import { signIn } from '../../../stores/actions';
import styles from './sign-in.module.scss';

type SignInForm = Pick<UserAPI, UserAPIKeys.email | UserAPIKeys.password>

export function SignIn() {
  const { t } = useTranslation();
  const signInSchema = userSchema.pick(['email', 'password']);
  const emailKey = UserAPIKeys.email;
  const passwordKey = UserAPIKeys.password;
  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({
    resolver: yupResolver(signInSchema)
  })

  const [state, setState] = useState({
    [emailKey]: '',
    [passwordKey]: ''
  });

  const dispatch = useAppDispatch();

  const onChange = useChange((fieldUpdated: FormDataChangedHook) => {
    setState({ ...state, ...fieldUpdated })
  })

  const onSubmit = handleSubmit((data) => {
    dispatch(signIn({
      [UserAPIKeys.email]: data[UserAPIKeys.email],
      [UserAPIKeys.password]: data[UserAPIKeys.password]
    }))
  })

  return (
    <>
      <h1 className={styles['title']}>{t('SignUpTitle')}</h1>
      <form onSubmit={onSubmit} className={styles['container']}>
        <div>
          <label htmlFor={emailKey}>{t('Email')}</label>
          <input {...register(emailKey)} id={emailKey} name={emailKey} type="email" onChange={onChange} />
          {errors?.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor={passwordKey}>{t('Password')}</label>
          <input {...register(passwordKey)} id={passwordKey} name={passwordKey} type="password" onChange={onChange} />
          {errors?.password && <p>{errors.password.message}</p>}
        </div>

        <button className="button" type="submit">{t('SignInBtn')}</button>
      </form>
    </>

  );
}

export default SignIn;
