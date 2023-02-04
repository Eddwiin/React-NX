import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataChangedHook, useChange } from '@react-nx/shared/hooks';
import { userSchema } from '@react-nx/shared/schemas';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../helpers/redux-helper';
import { UserAPI, UserAPIKeys } from '../../../shared/interfaces/UserAPI';
import { resetPassword } from '../../../stores/actions';
import styles from './reset-password.module.scss';

type ResetPasswordForm = Pick<UserAPI, UserAPIKeys.password> & { confirm_password: string };

export function ResetPassword() {
  const { t } = useTranslation();
  const passwordKey = UserAPIKeys.password;
  const confirmPasswordKey = 'confirm_password';
  const [state, setState] = useState({
    [passwordKey]: '',
    [confirmPasswordKey]: ''
  });
  const resetPasswordSchema = userSchema.pick(['password', 'confirm_password']);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>({
    resolver: yupResolver(resetPasswordSchema)
  });

  const onChange = useChange((fieldUpdated: FormDataChangedHook) => {
    setState({ ...state, ...fieldUpdated })
  })

  const onSubmit = handleSubmit((data) => {
    dispatch(resetPassword({
      [UserAPIKeys.password]: data[UserAPIKeys.password]
    }))
  });

  return (
    <form onSubmit={onSubmit} className={styles['container']}>
      <div>
        <label htmlFor={passwordKey}>{t('Password')}</label>
        <input {...register(passwordKey)} type="password" id={passwordKey} name={passwordKey} onChange={onChange} />
        {errors?.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor={confirmPasswordKey}>{t('ConfirmPassword')}</label>
        <input {...register(confirmPasswordKey)} type="password" id={confirmPasswordKey} name={confirmPasswordKey} onChange={onChange} />
        {errors?.confirm_password && <p>{errors.confirm_password.message}</p>}
      </div>

      <button type="submit">{t('ReinitPasswordBtn')}</button>
    </form>
  );
}

export default ResetPassword;
