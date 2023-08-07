"use client";
import { getAccessToken, retrieveToken } from "@/app/utils/retrieveToken";
import HeaderPanel from "./(components)/(headerPanel)/headerPanel";
import UsersPanel from "./(components)/(usersPanel)/usersPanel";
import { usePathname } from "next/navigation";
import MessagesPanel from "./(components)/(messagesPanel)/messagesPanel";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import retrieveFriendChatRooms from "@/app/api/account/retrieveRooms";
import { useAppDispatch, useAppSelector } from "@/app/(store)/hooks";
import { setChatRooms } from "@/app/(store)/features/userSlice";

const socket: Socket = io("http://localhost:3002");

export const AccountPage = () => {
  const userInformation = retrieveToken();
  const dispatch = useAppDispatch()
  const chatRooms = useAppSelector((state) => state.user.chatRooms)
  const chattingWith = useAppSelector((state) => state.user)
  console.log(chattingWith.chatroomID, chattingWith.chattingWithID)
  const accessToken =
    getAccessToken() === undefined || getAccessToken() === null
      ? ""
      : getAccessToken();

  const router = usePathname().split("/")[2];
  const [loading, setLoading] = useState(true)
  const [messageData, setMessageData] = useState<string>('')
  
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });


    const getUserFriendRooms = async () => {
      setLoading(true);
      try {
        const request = await retrieveFriendChatRooms((accessToken === null || accessToken === undefined) ? "" : accessToken);
        const response = request.data;
        socket.emit("sendUserFriendRoomsInformation", response)
        dispatch(setChatRooms({
          rooms: response
        }))
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
  }, [accessToken, dispatch]);

 
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

        <UsersPanel access={accessToken} />
        <MessagesPanel access={accessToken} socket={socket} 
       
        />
      </div>
    );
  }
};

export default AccountPage;
