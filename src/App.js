import React from 'react';

import logo from './logo.svg';
import './App.css';

import { Routing } from './components/routing'
import { AuthProvider } from './components/auth_provider'

const App = () => {
  return (
    <AuthProvider>
      <Routing/>
    </AuthProvider>
  );
}

export default App;
