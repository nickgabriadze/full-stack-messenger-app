"use client";

import retrieveToken from "@/app/utils/retrieveToken";

export const RedirectToPersonalAccount = () => {
  const styling = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  };

  const retrieveInfo = retrieveToken();

  if (retrieveInfo !== undefined) {
 
      window.location.href = `/account/${retrieveInfo?.username}`;
   

    return <h1 style={styling}>Redirecting to personal page...</h1>;
  } else {
   
        window.location.href = `/login`;
    
    return <h1 style={styling}>Redirecting to login page...</h1>;
  }


};

export default RedirectToPersonalAccount;
