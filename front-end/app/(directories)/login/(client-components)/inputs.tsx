"use client";

import { setPassword, setUsername } from "@/app/(store)/features/loginSlice";
import { useAppDispatch, useAppSelector } from "@/app/(store)/hooks";
import loginStyles from "../login.module.css";
import { validateInput } from "../../signup/(client-components)/inputs";

export const UsernameInput = () => {
  const username = useAppSelector((state) => state.login.username);
  const dispatch = useAppDispatch();

  return (
  
      <input
        className={loginStyles.inputsEach}
        placeholder={"Username"}
        type="text"
        value={username}
        onChange={(e) => {
          dispatch(
            setUsername({
              username: validateInput(e.target.value),
            })
          );
        }}
        maxLength={255}
        required
      />
 
  );
};

export const PasswordInput = () => {
  const password = useAppSelector((state) => state.login.password);
  const dispatch = useAppDispatch();

  return (
   
      <input
        className={loginStyles.inputsEach}
        value={password}
        placeholder={"Password"}
        onChange={(e) => {
          dispatch(
            setPassword({
              password: e.target.value,
            })
          );
        }}
        maxLength={255}
        type="password"
        required
      />

  );
};
