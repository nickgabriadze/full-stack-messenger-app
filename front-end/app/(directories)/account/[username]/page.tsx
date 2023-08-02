"use client";
import { getAccessToken, retrieveToken } from "@/app/utils/retrieveToken";
import HeaderPanel from "./(components)/(headerPanel)/headerPanel";
import UsersPanel from "./(components)/(usersPanel)/usersPanel";
import { usePathname } from "next/navigation";
import MessagesPanel from "./(components)/(messagesPanel)/messagesPanel";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const socket: Socket = io("http://localhost:3002");

export const AccountPage = () => {
  const userInformation = retrieveToken();
  const accessToken =
    getAccessToken() === undefined || getAccessToken() === null
      ? ""
      : getAccessToken();

  const router = usePathname().split("/")[2];

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("connect");
    };
  }, []);

  if (router !== userInformation?.username) {
    window.location.href = `/account/${userInformation?.username}`;
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

        <UsersPanel access={accessToken} socket={socket} />
        <MessagesPanel access={accessToken} />
      </div>
    );
  }
};

export default AccountPage;
