import { createContext, useContext, useState } from "react";

export const Context = createContext({} as any);

export const ContextProvider = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState(false as any);

  const logIn = (name: string) => {
    setLoggedIn(name);
  };

  return (
    <Context.Provider value={{ loggedIn, logIn }}>{children}</Context.Provider>
  );
};
