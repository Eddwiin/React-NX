import { Header } from '@react-nx/header';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

export function App() {
  return (
    <>
      <Header />
      <RouterProvider />
    </>
  );
}

export default App;
