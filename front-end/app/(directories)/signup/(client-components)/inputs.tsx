"use client";
import {
  setPassword,
  setRepeatedPassword,
  setUsername,
} from "@/app/(store)/features/registration";
import { useAppDispatch, useAppSelector } from "@/app/(store)/hooks";
import signupStyles from "../signup.module.css";

const inputStyling = {
  backgroundColor: "inherit",
  width: "100%",
  borderRadius: "5px",
};

export const validateInput = (value: string) => {
  return value.replace(" ", "").toLowerCase();
};

export const UsernameInput = () => {
  const appDispatch = useAppDispatch();
  const value = useAppSelector((state) => state.registration["username"]);

  return (
    <>
      <input
        style={inputStyling}
        className={signupStyles.inputsEach}
        type={"text"}
        value={validateInput(value)}
        placeholder={"Username"}
        onChange={(e) =>
          appDispatch(
            setUsername({
              username: validateInput(e.target.value),
            })
          )
        }
        title="At least 3 characters required"
        required
        minLength={3}
        maxLength={255}
      />
    </>
  );
};

export const PasswordInput = () => {
  const appDispatch = useAppDispatch();
  const value = useAppSelector((state) => state.registration["password"]);

  return (
    <>
      <input
        style={inputStyling}
        className={signupStyles.inputsEach}
        type={"password"}
        value={value}
        placeholder={"Password"}
        onChange={(e) =>
          appDispatch(
            setPassword({
              password: e.target.value,
            })
          )
        }
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$"
        title="At least one lower, upper, number and 8 characters required"
        required
        maxLength={255}
      />
    </>
  );
};

export const RepeatPasswordInput = () => {
  const appDispatch = useAppDispatch();
  const value = useAppSelector(
    (state) => state.registration["repeatedPassword"]
  );

  return (
    <>
      <input
        className={signupStyles.inputsEach}
        style={inputStyling}
        type={"password"}
        value={value}
        placeholder={"Confirm Password"}
        onChange={(e) =>
          appDispatch(
            setRepeatedPassword({
              repeatedPassword: e.target.value,
            })
          )
        }
        required
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$"
        title="At least one lower, upper, number and 8 characters required"
        maxLength={255}
      />
    </>
  );
};
