import React from 'react';
import styles from './authentification.module.scss';

/* eslint-disable-next-line */
export interface AuthentificationProps {}

export function Authentification(props: AuthentificationProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Authentification!</h1>
    </div>
  );
}

export default Authentification;
