import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '../app';
import Authentification from '../pages/authentification/authentification';
import ForgotPassword from '../pages/authentification/forgotPassword/forgot-password';
import ResetPassword from '../pages/authentification/resetPassword/reset-password';
import SignIn from '../pages/authentification/signIn/sign-in';
import SignUp from '../pages/authentification/signUp/sign-up';
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
            path: Paths.RESETPASSWORD,
            element: <ResetPassword />,
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
    path: Paths.DEFAULT,
    loader: () => {
      return redirect(`${Paths.AUTH}/${Paths.SIGNIN}`);
    },
  },
]);

export default router;
