import React from 'react';
import { Router } from '@reach/router'

import { Home } from '../screens/home';
import { Login } from '../screens/login';
import { Orders } from '../screens/orders';
import { NewOrder } from '../screens/new_order';
import { Products } from '../screens/products';
import { Customers } from '../screens/customers';
import { Landing } from '../screens/landing';
import { NewCustomerOrder } from '../screens/new_customer_order';
import { Catalog } from '../screens/catalog';

import { useAuth } from './auth_provider';

export const Routing = ({ navigate }) => {
  const user = useAuth();
  return (
    <Router>
      { user ? (
        <>
          <Home path='/' />
          <Orders path='/orders' />
          <NewOrder path='/order/new' uid={'new'}/>
          <NewOrder path='/order/:uid'/>
          <Products path='/products' />
          <Customers path='/customers' />
        </>
      ) : (
        <>
          <Login path='/login' />
          <Landing path='/' />
          <NewCustomerOrder path='/order' />
          <Catalog path='/catalog' />
        </>
      )}
    </Router>
  );
}