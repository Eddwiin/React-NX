import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataChangedHook, useChange } from '@react-nx/shared/hooks';
import { userSchema } from '@react-nx/shared/schemas';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../helpers/redux-helper';
import { UserAPI, UserAPIKeys } from '../../../shared/interfaces/UserAPI';
import { signUp } from '../../../stores/actions';
import styles from './sign-up.module.scss';

type SignUpForm = Omit<UserAPI, 'id'> & { confirm_password: string };

export function SignUp() {
  const signUpSchema = userSchema;
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema),
  });

  const firstNameKey = UserAPIKeys.firstName;
  const lastNameKey = UserAPIKeys.lastName;
  const emailKey = UserAPIKeys.email;
  const adressKey = UserAPIKeys.adress;
  const phoneKey = UserAPIKeys.phone;
  const passwordKey = UserAPIKeys.password;
  const confirmPasswordKey = 'confirm_password';

  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    [firstNameKey]: '',
    [lastNameKey]: '',
    [emailKey]: '',
    [adressKey]: '',
    [phoneKey]: '',
    [passwordKey]: '',
    [confirmPasswordKey]: '',
  });

  const onChange = useChange((fieldUpdated: FormDataChangedHook) => {
    setState({ ...state, ...fieldUpdated });
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(
      signUp({
        [UserAPIKeys.firstName]: data[UserAPIKeys.firstName],
        [UserAPIKeys.lastName]: data[UserAPIKeys.lastName],
        [UserAPIKeys.email]: data[UserAPIKeys.email],
        [UserAPIKeys.phone]: data[UserAPIKeys.phone],
        [UserAPIKeys.adress]: data[UserAPIKeys.adress],
        [UserAPIKeys.password]: data[UserAPIKeys.password],
      })
    );
  });

  return (
    <div className={styles['container']}>
      <div className={styles['container__title']}>
        <h1 className={styles['title']}>{t('SignUp')}</h1>
      </div>

      <form onSubmit={onSubmit}>
        <div
          className={styles['form-group'] + ' ' + styles['container__group']}
        >
          <label className={styles['form-group__label']} htmlFor={firstNameKey}>
            {t('FirstName') + '*'}
          </label>
          <input
            {...register(firstNameKey)}
            id={firstNameKey}
            className={styles['form-group__input']}
            name={firstNameKey}
            type="text"
            onChange={onChange}
          />
          {errors?.first_name && <p className="form-group_error">{errors.first_name.message}</p>}
        </div>

        <div
          className={styles['form-group'] + ' ' + styles['container__group']}
        >
          <label className={styles['form-group__label']} htmlFor={lastNameKey}>
            {t('LastName') + '*'}
          </label>
          <input
            {...register(lastNameKey)}
            id={lastNameKey}
            className={styles['form-group__input']}
            name={lastNameKey}
            type="text"
            onChange={onChange}
          />
          {errors?.last_name && <p className="form-group_error">{errors.last_name.message}</p>}
        </div>

        <div
          className={styles['form-group'] + ' ' + styles['container__group']}
        >
          <label className={styles['form-group__label']} htmlFor={emailKey}>
            {t('Email') + '*'}
          </label>
          <input
            {...register(emailKey)}
            id={emailKey}
            className={styles['form-group__input']}
            name={emailKey}
            type="email"
            onChange={onChange}
          />
          {errors?.email && <p className="form-group_error">{errors.email.message}</p>}
        </div>

        <div
          className={styles['form-group'] + ' ' + styles['container__group']}
        >
          <label className={styles['form-group__label']} htmlFor={adressKey}>
            {t('Adress') + '*'}
          </label>
          <input
            {...register(adressKey)}
            id={adressKey}
            className={styles['form-group__input']}
            name={adressKey}
            type="text"
            onChange={onChange}
          />
          {errors?.adress && <p className="form-group_error">{errors.adress.message}</p>}
        </div>

        <div
          className={styles['form-group'] + ' ' + styles['container__group']}
        >
          <label className={styles['form-group__label']} htmlFor={phoneKey}>
            {t('Phone') + '*'}
          </label>
          <input
            {...register(phoneKey)}
            id={phoneKey}
            className={styles['form-group__input']}
            name={phoneKey}
            type="tel"
            onChange={onChange}
          />
          {errors?.adress && <p className="form-group_error">{errors.adress.message}</p>}
        </div>

        <div
          className={styles['form-group'] + ' ' + styles['container__group']}
        >
          <label className={styles['form-group__label']} htmlFor={passwordKey}>
            {t('Password') + '*'}
          </label>
          <input
            {...register(passwordKey)}
            id={passwordKey}
            className={styles['form-group__input']}
            name={passwordKey}
            type="password"
            onChange={onChange}
          />
          {errors?.password && <p className="form-group_error">{errors.password.message}</p>}
        </div>

        <div
          className={styles['form-group'] + ' ' + styles['container__group']}
        >
          <label
            className={styles['form-group__label']}
            htmlFor={confirmPasswordKey}
          >
            {t('ConfirmPassword') + '*'}
          </label>
          <input
            {...register(confirmPasswordKey)}
            id={confirmPasswordKey}
            className={styles['form-group__input']}
            name={confirmPasswordKey}
            type="password"
            onChange={onChange}
          />
          {errors?.confirm_password && <p className="form-group_error">{errors.confirm_password.message}</p>}
        </div>

        <div className="flex justify-center pt-6">
          <button
            className={
              styles['form-group__button'] + ' w-9/12 md:w-7/12 lg:w-5/12'
            }
            type="submit"
          >
            {t('SignUpBtn')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
