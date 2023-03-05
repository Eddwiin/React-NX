import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '../app';
import Authentification from '../pages/authentification/authentification';
import ForgotPassword from '../pages/authentification/forgotPassword/forgot-password';
import SignIn from '../pages/authentification/signIn/sign-in';
import SignUp from '../pages/authentification/signUp/sign-up';
import { Home } from '../pages/home/home';
import { Paths } from './routes/paths';

const router = createBrowserRouter([
  {
    path: Paths.DEFAULT,
    element: <App />,
    children: [
      {
        path: Paths.AUTH,
        element: <Authentification />,
        children: [
          {
            path: Paths.SIGNIN,
            element: <SignIn />,
          },
          {
            path: Paths.SIGNUP,
            element: <SignUp />,
          },
          {
            path: Paths.FORGOTPASSWORD,
            element: <ForgotPassword />,
          },
          {
            path: '',
            loader: () => redirect(`${Paths.SIGNIN}`),
          },
        ],
      },
    ]
  },
  {
    path: Paths.HOME,
    element: <Home />
  },
  {
    path: Paths.DEFAULT,
    loader: () => {
      return redirect(`${Paths.AUTH}/${Paths.SIGNIN}`);
    },
  },
]);

export default router;
