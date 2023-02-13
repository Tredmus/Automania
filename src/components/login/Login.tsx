import { NavLink } from "react-router-dom";
import classes from "./Login.module.scss";

export const Login = () => {
  return (
    <NavLink to="/login" className={classes.login}>
      <img src="Images/profile.svg" alt="" />
      <span>Log in</span>
    </NavLink>
  );
};
