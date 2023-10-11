// storing the already logged user data
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  // unique user token
  token: "",
  // is the user authenticated
  isAuthenticated: false,
  // is the user present
  authenticate: (token) => {},
  // is the user logged out
  logout: () => {},
});

// if the user is logged in successfully
function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

 

  // save the unique user token
  function authenticate(token) {
    setAuthToken(token);
    // -- store the token in async storage --
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    // delete auth token after logout
    setAuthToken(null);
    // clear the token when logged out
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
