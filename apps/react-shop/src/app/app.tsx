import { Header } from '@react-nx/shared/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import router from './configs/router';

export function App() {
  const { t } = useTranslation();
  const menus = [t('SignIn'), t('SignUp')];

  const onClickIntoMenu = (menu: string) => {
    console.log('APP MENU', menu);
  };

  return (
    <>
      <Header
        title={t('AppName')}
        menus={menus}
        onClickIntoMenu={onClickIntoMenu}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
