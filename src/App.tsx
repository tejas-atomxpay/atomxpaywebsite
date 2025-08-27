import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import './App.css';
import { router } from './router';

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

