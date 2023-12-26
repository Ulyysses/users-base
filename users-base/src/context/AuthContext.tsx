"use client"

import { ReactNode, createContext, useCallback, useState } from "react";

interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContext {
  authState: {
    isAuthenticated: boolean;
    userName: string;
  };
  loginUser: (userName: string) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userName: "",
  });

  const loginUser = useCallback((userName: string) => {
    setAuthState({
      isAuthenticated: true,
      userName,
    });
  }, []);

  const logoutUser = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      userName: "",
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
