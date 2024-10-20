import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState } from "../types/user";
import * as storage from "../utils/asyncStorage";

const initialState = {
  isAuthenticated: false,
  email: "",
  profilePictureUrl:
    "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg",
  username: "",
  playerId: "",
  setAuth: () => {},
};

const AuthContext = createContext<AuthState>(initialState);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<AuthState>(initialState);

  useEffect(() => {
    async function fetchUser() {
      const user = await storage.getObject("user");
      if (user) {
        setAuth({
          ...user,
          isAuthenticated: true,
          setAuth: setAuth,
        });
      }
    }
    fetchUser();
  }, []);

  const value = { ...auth, setAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
