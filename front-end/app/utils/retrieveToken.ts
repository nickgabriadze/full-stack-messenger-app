"use client";
import jwtDecode from "jwt-decode";

export const retrieveToken = ():
  | { id: number; username: string; iat: number }
  | undefined => {
  if (typeof window !== "undefined") {
    const token = window.sessionStorage.getItem("user_access_token");
    if (token !== null && token !== "") {
      return jwtDecode(token);
    }
  }
};

export const getAccessToken = ():string | null | undefined =>{
  if (typeof window !== "undefined") {
    const token = window.sessionStorage.getItem("user_access_token");
    return token
  }
}

export default retrieveToken;
