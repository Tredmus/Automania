import { createContext, useContext, useState } from "react";

export const Context = createContext({} as any);

export const ContextProvider = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState(false as any);
  const [id, setId] = useState(localStorage.getItem("id"));

  const logIn = (name: string) => {
    setLoggedIn(name);
  };

  const getId = (id: string) => {
    setId(id);
  };

  return (
    <Context.Provider value={{ loggedIn, logIn, id, getId }}>
      {children}
    </Context.Provider>
  );
};
