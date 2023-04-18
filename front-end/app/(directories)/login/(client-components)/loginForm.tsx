"use client"
import login from "@/app/api/auth/login";
import loginStyling from "../login.module.css";
import { PasswordInput, UsernameInput } from "./inputs";
import { useAppSelector } from "@/app/(store)/hooks";
import { useState } from "react";


export const LoginForm = () => {
  const {username, password} = useAppSelector((state) => state.login)
  const [data, setData] = useState("");
  const handleLogin = async () => {
      const request = await login(username, password);
      const response = request.data;
      
      if(response.length === 0){
        setData("Username or password might not be correct")
      }else{
       console.log(response)
      }
    
  }


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
          <button onClick={handleLogin}>Continue</button>
        </div>
        <p>{data}</p>
      </div>
    </div>
    </>
  );
};

export default LoginForm;