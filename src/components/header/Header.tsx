import classes from "./Header.module.scss";
import { Login } from "../login/Login";
import { AddListing } from "../addListing/AddListing";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className={classes.header}>
      <div className={`${classes.headerInner} shell`}>
        <NavLink to="/">
          <img src="Images/logo.svg" alt="" />
        </NavLink>

        <div className={classes.menu}>
          <Login />

          <div className={classes.line}></div>

          <AddListing />
        </div>
      </div>
    </header>
  );
};
