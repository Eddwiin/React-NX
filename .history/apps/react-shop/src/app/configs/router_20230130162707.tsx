import Authentification from '@react-shop/pages/authentification/authentification';
import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { Paths } from './routes/paths';

const router = createBrowserRouter([
  {
    path: Paths.AUTH,
    element: <Authentification />,
    // children: [
    //   {
    //     path: Paths.SIGNIN,
    //     element: <SignIn />,
    //   },
    //   {
    //     path: Paths.SIGNUP,
    //     element: <SignUp />,
    //   },
    //   {
    //     path: Paths.FORGOTPASSWORD,
    //     element: <ForgotPassword />,
    //   },
    //   {
    //     path: Paths.RESETPASSWORD,
    //     element: <ResetPassword />,
    //   },
    //   {
    //     path: '',
    //     loader: () => redirect(`${Paths.SIGNIN}`),
    //   },
    // ],
  },
  {
    path: Paths.DEFAULT,
    loader: () => {
      return redirect(`${Paths.AUTH}/${Paths.SIGNIN}`);
    },
  },
]);

export default router;
