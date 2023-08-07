import { useAppDispatch, useAppSelector } from "@/app/(store)/hooks";
import messagesStyles from "./messagesPanel.module.css";
import Image from "next/image";
import sendIcon from "./icons/send-message-icon.svg";
import {
  setChatProperties,

} from "@/app/(store)/features/userSlice";
import { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import retrieveToken from "@/app/utils/retrieveToken";
import sendMessageToFriend from "@/app/api/account/sendMessage";
import retrieveMessages from "@/app/api/account/retrieveMessages";
export const MessagesPanel = ({
  access,
  socket,
}: {
  socket: Socket;
  access: string | undefined | null;
}) => {
  const { chattingWithID, chattingWithUsername, chatOpen, chatroomID } =
    useAppSelector((state) => state.user);

  const retrievedToken = retrieveToken();

  const senderReceiver = [
    retrievedToken === undefined ? -1 : retrievedToken.id,
    chattingWithID,
  ];
  
  console.log(senderReceiver);
  const chatRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const [message, setMessage] = useState<string>("");
  const chatDispatch = useAppDispatch();
  const [messagesBox, setMessagesBox] = useState<
    { authorID: number; receiverID: number, message: string; time: string }[
      
    ]
  >([]);

  useEffect(() => {
      setMessagesBox([])
      const getUserMessages = async () => {
        setLoading(true);
        try {
          const request = await retrieveMessages(
            access === null || access === undefined ? "" : access,
            
            chattingWithID
          );
          const response = request.data;
          console.log(response)
          setMessagesBox(response)
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
  
      getUserMessages();
      
  }, [chattingWithID, access])

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesBox.length]);

  if (
    chattingWithID === -1 &&
    chatOpen === false &&
    chattingWithUsername.trim().length === 0
  ) {
    return (
      <p className={messagesStyles["not-chatting"]}>
        Choose a person to talk to
      </p>
    );
  }

  return (
    <section className={messagesStyles["message-section"]}>
      <div className={messagesStyles["messages-box"]}>
        {messagesBox.map((eachMessage, i) => {
          return (
            <div key={i} ref={chatRef} className={messagesStyles['each-message-content']}
            style={eachMessage.authorID === senderReceiver[0] ? {alignItems : 'flex-end'} : {alignItems: 'flex-start'} }
            >
              <h4>{eachMessage.message}</h4>
              <h5>{messagesBox.length - 1 == i ?`${new Date(eachMessage.time).getHours()}:${new Date(
                eachMessage.time
              ).getMinutes()}` : ''}</h5>
            </div>
          );
        })}
      </div>

      <div className={messagesStyles["controls"]}>
        <div className={messagesStyles["controls-txt"]}>
          <input
            placeholder={`Send message to ${chattingWithUsername}`}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            className={messagesStyles["msgbox"]}
          ></input>
          <button
            className={messagesStyles["send-msg-btn"]}
            onClick={() => {
              if (senderReceiver[0] !== -1) {
                setMessagesBox((prev) => [
                  ...prev,
                  {
                    authorID: senderReceiver[0],
                    receiverID: senderReceiver[1],
                    message: message,
                    time: new Date().toISOString(),
                  },
                ]);

                sendMessageToFriend(access === null || access === undefined ? '' : access, {authorID: senderReceiver[0], receiverID: senderReceiver[1], messageContent: message, time: new Date().toISOString().slice(0, 19).replace('T', ' ')})

              } else {
                alert("There is an error, please try again later");
              }
            }}
          >
            <Image
              src={sendIcon}
              alt="Send Message"
              width={30}
              height={30}
            ></Image>
          </button>
        </div>

        <div className={messagesStyles["controls-options"]}>
          <button>Delete Chat</button>
          <button
            onClick={() => {
              chatDispatch(
                setChatProperties({
                  id: -1,
                  chatOpen: false,
                  username: "",
                  chatRoomID: "",
                })
              );
            }}
          >
            Close Chat
          </button>
        </div>
      </div>
    </section>
  );
};

export default MessagesPanel;
