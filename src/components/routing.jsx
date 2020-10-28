import React, { useState, useEffect } from 'react';
import { Router, Redirect } from '@reach/router'

import { Home } from '../screens/home';
import { Orders } from '../screens/orders';

export const Routing = ({ navigate }) => {
  return (
    <Router>
      <Home path="/" />
      <Orders path="/orders" />
    </Router>
  );
}