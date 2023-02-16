import { NavLink } from "react-router-dom";
import classes from "./Login.module.scss";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../ContextProvider";

export const Login = () => {
  const context = useContext(Context);
  const loggedIn = context.loggedIn;

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [firstName, setFirstName] = useState(name ? name.split(" ")[0] : null);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setName(localStorage.getItem("name"));
      setFirstName(name ? name.split(" ")[0] : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token, name]);

  return (
    <NavLink to="/login" className={classes.login}>
      <img src={`images/${token ? "profile-logged" : "profile"}.svg`} alt="" />
      {token?.length || loggedIn ? (
        <h6>Hi, {firstName}</h6>
      ) : (
        <span>Log in</span>
      )}
    </NavLink>
  );
};
