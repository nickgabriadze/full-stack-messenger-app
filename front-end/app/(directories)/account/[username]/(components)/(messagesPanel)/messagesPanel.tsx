import { useAppDispatch, useAppSelector } from "@/app/(store)/hooks";
import messagesStyles from "./messagesPanel.module.css";
import Image from "next/image";
import sendIcon from "./icons/send-message-icon.svg";
import { setChatProperties } from "@/app/(store)/features/userSlice";
import { Socket } from "socket.io-client";
import { useState } from "react";
export const MessagesPanel = ({
  access,
  socket,
  messageData
}: {
  messageData: string
  socket:Socket
  access: string | undefined | null;
}) => {
  const { chattingWithID, chattingWithUsername, chatOpen } = useAppSelector(
    (state) => state.user
  );

  const [message, setMessage] = useState<string>("")
  const chatDispatch = useAppDispatch();
    const [messagesBox, setMessagesBox] = useState<string[]>([])

  if (
    chattingWithID === -1 &&
    chatOpen === false &&
    chattingWithUsername.trim().length === 0
  ) {
    return <p className={messagesStyles["not-chatting"]}>Choose a person to talk to</p>;
  }


   

    

  return (
    <section className={messagesStyles["message-section"]}>
      <div className={messagesStyles["messages-box"]}>{messageData}
      </div>

      <div className={messagesStyles["controls"]}>
        <div className={messagesStyles["controls-txt"]}>
          <input placeholder={`Send message to ${chattingWithUsername}`} 
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          value={message}
          className={messagesStyles['msgbox']}></input>
          <button className={messagesStyles['send-msg-btn']}
          onClick={() => {
            setMessagesBox((prev) => [...prev, message])
            socket.emit("send-message", (["4e7abffd245bf1a7cae68fb4fd5b5ce4", message]))

          }}
          >
            <Image src={sendIcon} alt="Send Message" width={30} height={30}></Image>
          </button>
        </div>

        <div className={messagesStyles["controls-options"]}>
          
                <button>Delete Chat</button>
                <button>Remove {chattingWithUsername} from friends</button>
                <button onClick={() => {
                    chatDispatch(setChatProperties({
                        id: -1,
                        chatOpen: false,
                        username: ""
                    }))
                }}>Close Chat</button>
        </div>
      </div>
    </section>
  );
};

export default MessagesPanel;
