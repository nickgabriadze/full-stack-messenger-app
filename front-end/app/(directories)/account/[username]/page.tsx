"use client";
import { retrieveToken } from "@/app/utils/retrieveToken";
import HeaderPanel from "./(components)/(headerPanel)/headerPanel";
import UsersPanel from "./(components)/(usersPanel)/usersPanel";

export const AccountPage = () => {
  const userInformation = retrieveToken();
  const accessToken = typeof window !== undefined ? sessionStorage.getItem("user_access_token") : "";

  if (userInformation === undefined) {
    window.location.href = "/login";
  } else {
    return (
      <div>
        <HeaderPanel
          username={userInformation?.username}
          access={accessToken}
        />

        <UsersPanel access={accessToken}/>
      </div>
    );
  }
};

export default AccountPage;
