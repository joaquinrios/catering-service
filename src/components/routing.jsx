import React, { useState, useEffect } from 'react';
import { Router, Redirect } from '@reach/router'

import { Home } from '../screens/home';
import { Orders } from '../screens/orders';
import { NewOrder } from '../screens/newOrder';

export const Routing = ({ navigate }) => {
  return (
    <Router>
      <Home path="/" />
      <Orders path="/orders" />
      <NewOrder path="newOrder" />
    </Router>
  );
}