"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLogin: false,
    data: {},
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8081/api/common/SelectId",
          { withCredentials: true }
        );
        setUser({
          isLogin: true,
          data,
        });
      } catch (error) {
        setUser((prev) => ({
          ...prev,
          data: false,
        }));
      }
    };

    fetchUserData();
  }, []);

  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
