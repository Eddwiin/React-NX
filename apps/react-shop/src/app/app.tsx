import { Header } from '@react-nx/shared/ui';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './configs/router';

export function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
