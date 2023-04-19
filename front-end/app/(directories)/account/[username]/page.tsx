"use client";
import { retrieveToken } from "@/app/utils/retrieveToken";
import HeaderPanel from "./(components)/(headerPanel)/headerPanel";

export const AccountPage = () => {
    const userInformation = retrieveToken();
    const accessToken = sessionStorage.getItem("user_access_token")
    if(userInformation === undefined) {
      return <h1>NOT FOUND</h1>
    }

  return (
    <div>
      <HeaderPanel username={userInformation?.username} access={accessToken} />
    </div>
  );
};

export default AccountPage;
