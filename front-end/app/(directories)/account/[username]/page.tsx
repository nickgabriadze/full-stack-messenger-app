"use client";
import { retrieveToken } from "@/app/utils/retrieveToken";
import HeaderPanel from "./(components)/(headerPanel)/headerPanel";

export const AccountPage = () => {
  const userInformation = retrieveToken();
  const accessToken = sessionStorage.getItem("user_access_token");
  if (userInformation === undefined) {
    window.location.href = "/login";
  } else {
    return (
      <div>
        <HeaderPanel
          username={userInformation?.username}
          access={accessToken}
        />
      </div>
    );
  }
};

export default AccountPage;
