"use client";
import jwtDecode from "jwt-decode";

export const retrieveToken = ():{id: number; username: string, iat: number} | undefined => {
 
    const token = window.sessionStorage.getItem("user_access_token");
    if (token !== null && token !== "") {
      return jwtDecode(token);
    } 

};

export default retrieveToken;