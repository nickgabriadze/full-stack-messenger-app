"use client";
import { getAccessToken, retrieveToken } from "@/app/utils/retrieveToken";
import HeaderPanel from "./(components)/(headerPanel)/headerPanel";
import UsersPanel from "./(components)/(usersPanel)/usersPanel";
import { usePathname } from "next/navigation";
import MessagesPanel from "./(components)/(messagesPanel)/messagesPanel";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import retrieveFriendChatRooms from "@/app/api/account/retrieveRooms";

const socket: Socket = io("http://localhost:3002");

export const AccountPage = () => {
  const userInformation = retrieveToken();
  const accessToken =
    getAccessToken() === undefined || getAccessToken() === null
      ? ""
      : getAccessToken();

  const router = usePathname().split("/")[2];
  const [loading, setLoading] = useState(true)
  const [friendRooms, setFriendRooms] = useState([])
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });


    const getUserFriendRooms = async () => {
      setLoading(true);
      try {
        const request = await retrieveFriendChatRooms((accessToken === null || accessToken === undefined) ? "" : accessToken);
        const response = request.data;
        setFriendRooms(response);
        
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUserFriendRooms();

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("connect");
    };
  }, [accessToken]);

  if (router !== userInformation?.username) {
    window.location.href = `/account/${userInformation?.username}`;
  }
  
  if (loading === false){
    socket.emit("sendUserFriendRoomsInformation", friendRooms)
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
        <MessagesPanel access={accessToken} socket={socket}/>
      </div>
    );
  }
};

export default AccountPage;
