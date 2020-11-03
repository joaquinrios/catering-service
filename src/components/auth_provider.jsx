import React, { useContext, useState, useEffect } from 'react';
import { navigate } from '@reach/router'
import { auth } from '../fb_app';

import { Loading } from '../components/loading.jsx';

const AuthContext = React.createContext();

export function useAuth(){
  return useContext(AuthContext);
}

export function signOut(){
  auth.signOut();
  navigate('/');
}

export const AuthProvider = ({ children }) => { 
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(
      async (authUser) => {
        let storeUser = null
        if (authUser) {
          storeUser = authUser
        }
        setUser(storeUser);
        setReady(true);
      }
    );
    return function cleanup() {
      unsubAuth()
    }
  }, [])

  return (
    <AuthContext.Provider value={ user }>
      { ready ? children : ( <Loading/> )}
    </AuthContext.Provider>
  )
}