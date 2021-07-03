import React, { useState } from "react";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, setToken, setIsAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
