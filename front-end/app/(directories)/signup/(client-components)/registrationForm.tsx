"use client";
import { useAppSelector } from "@/app/(store)/hooks";
import { useState } from "react";
import signupStyling from "../signup.module.css";
import { PasswordInput, RepeatPasswordInput, UsernameInput } from "./inputs";
import registerUser from "@/app/api/auth/register";
import { signUpChecker } from "../checkSignup";

export const RegistrationForm = () => {
  const { username, password, repeatedPassword } = useAppSelector(
    (user) => user.registration
  );
  const [data, setData] = useState<String | Boolean>("");

  const handleRegistration = async () => {
    try{
    const req = await registerUser(username, password);
    const response = req.data;

    if (response === "OK") {
      setData(
        "You've been registered successfully and will be redirected to log in page"
      );
        setTimeout(() => {
          window.location.href="/login"
        }, 2000)
    }
  }catch(err){
    setData("This username is already registered")
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
            const checked = signUpChecker(username, password, repeatedPassword);
             if(checked === true){
            
                handleRegistration()
            }else{
              setData(typeof checked === "string" ? checked: "")
            }
          }}
          >
            Sign up
          </button>
        </div>
        <p className={signupStyling["info"]}>{typeof data === "string" ? data: ""}</p>
      </div>
    </div>
  );
};

export default RegistrationForm;
