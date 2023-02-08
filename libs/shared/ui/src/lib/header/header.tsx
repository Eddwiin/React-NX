import React from 'react';
import styles from './header.module.scss';

/* eslint-disable-next-line */
export interface HeaderProps {
  title: string;
  menus?: string[];
  onClickIntoMenu?: (menu: string) => void;
}

export function Header(props: HeaderProps) {
  return (
    <div className={styles['header']}>
      <h1 className={styles['header__title']}>{props.title}</h1>

      <div className={styles['header__menus']}>
        {props.menus?.map((menu, idx) => (
          <span
            className={styles['header__menus__label']}
            onClick={() => {
              props.onClickIntoMenu ? props.onClickIntoMenu(menu) : undefined;
            }}
            key={idx}
          >
            {menu}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Header;
