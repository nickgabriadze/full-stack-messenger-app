"use client"
import retrieveToken from "@/app/utils/retrieveToken";
import LoginForm from "./(client-components)/loginForm";

const LogIn = () => {
  const access = retrieveToken();

  if (access !== undefined) {
    window.location.href = `/account/${access.username}`;
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
};

export default LogIn;
