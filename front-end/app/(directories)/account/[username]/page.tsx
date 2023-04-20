"use client";
import { retrieveToken } from "@/app/utils/retrieveToken";
import HeaderPanel from "./(components)/(headerPanel)/headerPanel";
import UsersPanel from "./(components)/(usersPanel)/usersPanel";
import { usePathname } from "next/navigation";

export const AccountPage = () => {
  const userInformation = retrieveToken();
  const accessToken = typeof window !== undefined ? sessionStorage.getItem("user_access_token") : "";
  const router = usePathname().split("/")[2]
  
  if(router !== userInformation?.username){
    window.location.href=`/account/${userInformation?.username}`
  }
  

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
