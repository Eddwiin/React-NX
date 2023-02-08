import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './authentification.module.scss';

export function Authentification() {
  return (
    <div className={styles['container']}>
      <Outlet />
    </div>
  );
}

export default Authentification;
