import classes from "./Login.module.scss";

export const Login = () => {
  return (
    <div className={classes.login}>
      <form action="" className="form">
        <div className="formGroup">
          <div className="input">
            <label htmlFor="email">Email</label>

            <input type="email" id="email" />
          </div>

          <div className="input">
            <label htmlFor="password">Password</label>

            <input type="password" id="password" />
          </div>
        </div>
      </form>
    </div>
  );
};
