"use client";
import { useAppSelector } from "@/app/(store)/hooks";
import { useState } from "react";
import signupStyling from "../signup.module.css";
import { PasswordInput, RepeatPasswordInput, UsernameInput } from "./inputs";
import registerUser from "@/app/api/register";

export const RegistrationForm = () => {
  const { username, password, repeatedPassword } = useAppSelector(
    (user) => user.registration
  );
  const [data, setData] = useState("");

  const handleRegistration = async () => {
    const req = await registerUser(username, password);
    const response = req.data;

    if (response === "OK") {
      setData(
        "You've been registered successfully and will be redirected to log in page"
      );
      setTimeout(() => (window.location.href = "/login"), 2000);
    }
  };

  return (
    <div className={signupStyling.centeredForm}>
      <div className={signupStyling["sign-up-form"]}>
        <h3>Register</h3>
        <div className={signupStyling["inputs"]}>
          <UsernameInput />
          <PasswordInput />
          <RepeatPasswordInput />
        </div>

        <div className={signupStyling.singUpbutton}>
          <button
            onClick={() => {
              if (
                password === repeatedPassword &&
                username.trim().length > 2 &&
                password.trim().length > 8
              ) {
                handleRegistration();
              } else {
                setData("Input fields should be set appropriately");
                setTimeout(() => {
                  setData("");
                }, 1500);
              }
            }}
          >
            Sign up
          </button>
        </div>
        <p className={signupStyling["info"]}>{data}</p>
      </div>
    </div>
  );
};

export default RegistrationForm;
