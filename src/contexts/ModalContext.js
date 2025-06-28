"use client";
import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginedInUser, setLoggedInUser] = useState(false);

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const closeAll = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isRegisterOpen,
        isLoginOpen,
        openRegister,
        openLogin,
        closeAll,
        loginedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
