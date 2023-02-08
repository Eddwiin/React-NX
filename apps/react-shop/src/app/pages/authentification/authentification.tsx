import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './authentification.module.scss';

/* eslint-disable-next-line */
export interface AuthentificationProps {}

export function Authentification(props: AuthentificationProps) {
  return (
    <div className={styles['container']}>
      <Outlet />
    </div>
  );
}

export default Authentification;
