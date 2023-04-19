"use client"
import jwtDecode from "jwt-decode";

export const retrieveToken = () => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("user_access_token");
    if (token !== null && token !== "") {
      return jwtDecode(token);
    } else {
      return "No token available";
    }
  }
};
