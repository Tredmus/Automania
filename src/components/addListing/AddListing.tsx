import { NavLink } from "react-router-dom";
import classes from "./AddListing.module.scss";

export const AddListing = () => {
  return (
    <NavLink
      to="/listing"
      className={`${classes.addListing} ${classes.btn} btn`}
    >
      <img src="images/plus.svg" alt="" />

      <span>Add Listing</span>
    </NavLink>
  );
};
