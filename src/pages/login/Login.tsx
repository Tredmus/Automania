import { useContext, useState } from "react";
import classes from "./Login.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../ContextProvider";

export const Login = () => {
  const context = useContext(Context);
  const logIn = context.logIn;
  const getId = context.getId;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await axios.post(
        "https://automania.herokuapp.com/user/login",
        data
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.user._id);
      localStorage.setItem("name", response.data.user.fullName);
      logIn(response.data.user.fullName.split(" ")[0]);
      getId(response.data.user._id);

      navigate("/");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className={classes.login}>
      <div className={classes.background}></div>

      <form action="" className={`${classes.form} form`}>
        <div className={classes.formInner}>
          <img src="images/logo.svg" alt="" className={classes.logo} />

          <h4>Welcome Back</h4>

          <div className="formGroup">
            <div className={`${classes.input} input`}>
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                className="field"
                onChange={handleEmailChange}
              />
            </div>

            <div className={`${classes.input} input`}>
              <label htmlFor="password">Password</label>

              <div className={classes.fieldWrapper}>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  className="field"
                  onChange={handlePasswordChange}
                />

                <img
                  src={`images/${showPassword ? "eye-active" : "eye"}.svg`}
                  alt=""
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              </div>
            </div>

            <div
              className={`${classes.btn} btn ${
                (email.length === 0 || password.length === 0) && "btn--inactive"
              }`}
              onClick={handleSubmit}
            >
              Log In
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
