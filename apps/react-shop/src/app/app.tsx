import { Header } from '@react-nx/shared/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { Paths } from './configs/routes/paths';

enum HeaderMenu {
  SignIn = "Connexion",
  SignUp = "Inscription"
}

export function App() {
  const { t } = useTranslation();
  const menus = [t('SignIn'), t('SignUp')];
  const navigate = useNavigate()

  const onClickIntoMenu = (menu: string) => {
    switch(menu) {
      case HeaderMenu.SignIn:
        navigate(`${Paths.AUTH}/${Paths.SIGNIN}`);
        break;
      
      case HeaderMenu.SignUp:
        navigate(`${Paths.AUTH}/${Paths.SIGNUP}`);
        break;
    }
  };

  return (
    <>
      <Header
        title={t('AppName')}
        menus={menus}
        onClickIntoMenu={onClickIntoMenu}
      />
      <Outlet />
    </>
  );
}

export default App;
