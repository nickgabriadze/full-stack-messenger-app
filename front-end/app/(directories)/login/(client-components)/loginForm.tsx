import loginStyling from "../login.module.css";
import { PasswordInput, UsernameInput } from "./inputs";

export const LoginForm = () => {
  
  return (
    <>
      <div className={loginStyling.centerForm}>
      <div className={loginStyling["log-in-form"]}>
        <h3>Log In</h3>
        <div className={loginStyling["inputs"]}>
          <UsernameInput />
          <PasswordInput />
        </div>

        <div className={loginStyling.loginButton}>
          <button>Continue</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginForm;