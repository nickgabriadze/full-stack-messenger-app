import { useAppDispatch, useAppSelector } from "@/app/(store)/hooks";
import messagesStyles from "./messagesPanel.module.css";
import Image from "next/image";
import sendIcon from "./icons/send-message-icon.svg";
import { setChatProperties } from "@/app/(store)/features/userSlice";
export const MessagesPanel = ({
  access,
}: {
  access: string | undefined | null;
}) => {
  const { chattingWithID, chattingWithUsername, chatOpen } = useAppSelector(
    (state) => state.user
  );

  const chatDispatch = useAppDispatch();

  if (
    chattingWithID === -1 &&
    chatOpen === false &&
    chattingWithUsername.trim().length === 0
  ) {
    return <p className={messagesStyles["not-chatting"]}>Choose a person to talk to</p>;
  }

  return (
    <section className={messagesStyles["message-section"]}>
      <div className={messagesStyles["messages-box"]}></div>

      <div className={messagesStyles["controls"]}>
        <div className={messagesStyles["controls-txt"]}>
          <textarea placeholder={`Send message to ${chattingWithUsername}`} className={messagesStyles['msgbox']}></textarea>
          <button className={messagesStyles['send-msg-btn']}>
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
