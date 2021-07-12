import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    let token_exp = localStorage.getItem("token_exp");
    const exp = token_exp * 1000;
    const now = new Date();
    const twoMinutes = 1000 * 60 * 2;
    console.log(` ${exp} ${now.getTime()}`);

    if (token && exp - now.getTime() > twoMinutes) {
      console.log("hooked true");
      setIsAuthenticated(true);
      return true;
    } else {
      console.log("hooked expired");
      setIsAuthenticated(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        checkToken,
        isAuthenticated,
        setToken,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
