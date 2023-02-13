import { NavLink } from "react-router-dom";
import classes from "./Listing.module.scss";

export const Listing = () => {
  return (
    <div className={classes.listing}>
      <header className={classes.header}>
        <div className="row">
          <NavLink to="/" className={classes.x}>
            <img src="Images/x-black.svg" alt="" />
          </NavLink>

          <h4>New Listing</h4>
        </div>

        <NavLink to="/" className="btn">
          Save Listing
        </NavLink>
      </header>

      <form action="" className="form">
        <div className="formGroup">
          <h5>General Information</h5>

          <div className="formRow">
            <div className="input">
              <label htmlFor="brand">Brand</label>
              <input type="text" id="brand" className="field" />
            </div>

            <div className="input">
              <label htmlFor="model">Model</label>
              <input type="text" id="model" className="field" />
            </div>

            <div className="input inputSmall">
              <label htmlFor="price">Price</label>
              <input type="text" id="price" className="field" />
            </div>
          </div>
        </div>

        <div className={classes.line}></div>

        <div className="formGroup">
          <h5>Photos</h5>

          <div className="row">
            <div className="input">
              <label htmlFor="model">Main Photo</label>
              <button className="btn photoBtn">
                <img src="Images/plus-blue.svg" alt="" />
                <span>Upload</span>
              </button>
            </div>

            <div className="input">
              <label htmlFor="model">Additional Photos</label>
              <button className="btn photoBtn">
                <img src="Images/plus-blue.svg" alt="" />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
