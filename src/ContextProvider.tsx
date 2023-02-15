import { createContext, useContext, useState } from "react";

export const Context = createContext({} as any);

export const ContextProvider = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setLoggedIn(true);
  };

  return (
    <Context.Provider value={{ loggedIn, logIn }}>{children}</Context.Provider>
  );
};
