"use client";
import React, { useEffect, useState } from "react";
import firebase_app from "./config";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
const auth = getAuth(firebase_app);

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
}

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      setAuthLoading(false);
    });
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
