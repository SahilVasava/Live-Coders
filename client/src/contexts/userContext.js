import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";

import api from "../utils/axios";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  const fetchUser = async () => {
    console.log("[fetchUser]");
    console.log(isAuthenticated);
    if (isAuthenticated) {
      const {
        data: { data },
      } = await api.get("http://localhost:4000/user");
      console.log(data);
      setUser(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
