import React, { useState } from 'react';
import styles from './sign-up.module.scss';
import { UserAPI, UserAPIKeys } from '../../../shared/interfaces/UserAPI';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataChangedHook, useChange } from '@react-nx/shared/hooks';
import { useTranslation } from "react-i18next";
import { userSchema } from '@react-nx/shared/schemas';

type SignUpForm = Omit<UserAPI, 'id'> & { confirm_password: string };

export function SignUp() {
  const signUpSchema = userSchema;
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema)
  })

  const firstNameKey = UserAPIKeys.firstName;
  const lastNameKey = UserAPIKeys.lastName;
  const emailKey = UserAPIKeys.email;
  const adressKey = UserAPIKeys.adress;
  const phoneKey = UserAPIKeys.phone;
  const passwordKey = UserAPIKeys.password;
  const confirmPasswordKey = "confirm_password"

  const [state, setState] = useState({
    [firstNameKey]: '',
    [lastNameKey]: '',
    [emailKey]: '',
    [adressKey]: '',
    [phoneKey]: '',
    [passwordKey]: '',
    [confirmPasswordKey]: '',
  })

  const handleChange = useChange((fieldUpdated: FormDataChangedHook) => {
    setState({ ...state, ...fieldUpdated })
  });


  const onSubmit = handleSubmit(data => {
    console.log("hello data", data)
  })

  return (
    <form onSubmit={onSubmit} className={styles['container']}>
      <div>
        <label htmlFor={firstNameKey}>{t('FirstName')}</label>
        <input {...register(firstNameKey)} id={firstNameKey} name={firstNameKey} type="text" onChange={handleChange} />
        {errors?.first_name && <p>{errors.first_name.message}</p>}
      </div>

      <div>
        <label htmlFor={lastNameKey}>{t('LastName')}</label>
        <input {...register(lastNameKey)} id={lastNameKey} name={lastNameKey} type="text" onChange={handleChange} />
        {errors?.last_name && <p>{errors.last_name.message}</p>}
      </div>

      <div>
        <label htmlFor={emailKey}>{t('Email')}</label>
        <input {...register(emailKey)} id={emailKey} name={emailKey} type="email" onChange={handleChange} />
        {errors?.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor={adressKey}>{t('Adress')}</label>
        <input {...register(adressKey)} id={adressKey} name={adressKey} type="text" onChange={handleChange} />
        {errors?.adress && <p>{errors.adress.message}</p>}
      </div>

      <div>
        <label htmlFor={phoneKey}>{t('Phone')}</label>
        <input {...register(phoneKey)} id={phoneKey} name={phoneKey} type="tel" onChange={handleChange} />
        {errors?.adress && <p>{errors.adress.message}</p>}
      </div>


      <div>
        <label htmlFor={passwordKey}>{t('Password')}</label>
        <input {...register(passwordKey)} id={passwordKey} name={passwordKey} type="password" onChange={handleChange} />
        {errors?.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor={passwordKey}>{t('ConfirmPassword')}</label>
        <input {...register(passwordKey)} id={passwordKey} name={passwordKey} type="password" onChange={handleChange} />
        {errors?.confirm_password && <p>{errors.confirm_password.message}</p>}
      </div>

      <button type="submit">{t('Submit')}</button>

    </form>
  );
}

export default SignUp;
