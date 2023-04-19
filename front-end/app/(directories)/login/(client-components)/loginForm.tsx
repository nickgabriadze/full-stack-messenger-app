"use client"
import login from "@/app/api/auth/login";
import loginStyling from "../login.module.css";
import { PasswordInput, UsernameInput } from "./inputs";
import { useAppSelector } from "@/app/(store)/hooks";
import { useState } from "react";
import loginChecker from "../checkLogin";
import { saveToSession } from "@/app/utils/saveToSession";


export const LoginForm = () => {
  const {username, password} = useAppSelector((state) => state.login)
  const [data, setData] = useState<Boolean | string>("");

 async function handleLogin() {
    try{
    
      const request = await login(username, password);
      const response = request.data;
      saveToSession(response)
      setData("You've logged in successfully")
      setTimeout(() => {
        window.location.href=`/account/${username}`
      }, 1500)
    }catch(err){
     
     setData("Either the username or the password is invalid")
     setTimeout(() => {
      setData("")
     },  1500)
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
          <button onClick={() => {
            
            const checkInfo = loginChecker(username, password);
            
            if(checkInfo === true){
                handleLogin()
              
            }else{
              console.log(password)
              setData(typeof checkInfo === "string" ? checkInfo : "")
              setTimeout(() => {
                setData("")
              }, 1000)
            }
            
            }}>Continue</button>
        </div>
        <p className={loginStyling['info']}>{typeof data === "string" ? data: ""}</p>
      </div>
    </div>
    </>
  );
};

export default LoginForm;