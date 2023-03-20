import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => { },
  logout: () => { },
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isFetchingToken, setIsFetchingToken] = useState(true);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setAuthToken(storedToken);
      }
      setIsFetchingToken(false)
    }
    fetchToken();
  }, []);
  if (isFetchingToken) {
    return <LoadingOverlay/>
  }
  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
