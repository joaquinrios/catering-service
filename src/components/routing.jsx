import React, { useState, useEffect } from 'react';
import { Router, Redirect } from '@reach/router'

import { Home } from '../screens/home';
import { Login } from '../screens/login';
import { Orders } from '../screens/orders';
import { NewOrder } from '../screens/new_order';

export const Routing = ({ navigate }) => {
  return (
    <Router>
      <Home path='/' />
      <Login path='/login' />
      <Orders path='/orders' />
      <NewOrder path='/new_order' />
    </Router>
  );
}