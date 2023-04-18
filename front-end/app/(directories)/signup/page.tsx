import { NextPage } from "next";
import React from "react";
import RegistrationForm from "./(client-components)/registrationForm";

export const metadata = {
  title: "Sign Up",
  description: "Sign up in order to message the world!",
};

const SignUp: NextPage = () => {
  
  return (
    <div>
      <RegistrationForm />
      
      </div>
  );
};

export default SignUp;
