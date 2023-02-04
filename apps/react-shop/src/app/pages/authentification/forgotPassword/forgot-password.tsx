import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataChangedHook, useChange } from '@react-nx/shared/hooks';
import { userSchema } from '@react-nx/shared/schemas';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../helpers/redux-helper';
import { UserAPI, UserAPIKeys } from '../../../shared/interfaces/UserAPI';
import { forgotPassword } from '../../../stores/actions';
import styles from './forgot-password.module.scss';

type ForgotPasswordForm = Pick<UserAPI, UserAPIKeys.email>;

export function ForgotPassword() {
  const { t } = useTranslation();
  const emailKey = UserAPIKeys.email
  const [state, setState] = useState({
    [emailKey]: ''
  });

  const forgotPasswordSchema = userSchema.pick(["email"]);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema)
  })
  const dispatch = useAppDispatch();


  const onChange = useChange((fieldUpdated: FormDataChangedHook) => {
    setState({ ...state, ...fieldUpdated })
  })

  const onSubmit = handleSubmit((data) => {
    dispatch(forgotPassword({
      [UserAPIKeys.email]: data[UserAPIKeys.email]
    }))
  })

  return (
    <form onSubmit={onSubmit} className={styles['container']}>
      <div>
        <label htmlFor={emailKey}>{t('Email')}</label>
        <input {...register(emailKey)} type="email" id={emailKey} name={emailKey} onChange={onChange} />
        {errors?.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">{t('ForgotPasswordBtn')}</button>
    </form>
  );
}

export default ForgotPassword;
