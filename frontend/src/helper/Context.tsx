import React, { createContext, useState } from 'react';

type LoginContextProps = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginContext = createContext<LoginContextProps>(
  {} as LoginContextProps
);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  let initialState: boolean;
  const isloggedIn = sessionStorage.getItem('loggedIn');
  isloggedIn ? (initialState = true) : (initialState = false);
  const [loggedIn, setLoggedIn] = useState(initialState);
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
