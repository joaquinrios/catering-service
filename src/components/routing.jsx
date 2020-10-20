import React, { useState, useEffect } from 'react';
import { Router, Redirect } from '@reach/router'

import { Home } from '../screens/home';

export const Routing = ({ navigate }) => {
  return (
    <Router>
      <Home path='/'/>       
    </Router>
  )
}