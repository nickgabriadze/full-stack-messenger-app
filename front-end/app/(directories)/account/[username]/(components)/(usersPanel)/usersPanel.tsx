"use client";
import { useEffect, useState } from "react";
import friendsStyles from "./usersPanel.module.css";
import retrieveFriends from "@/app/api/account/retrieveFriends";
import filledCircle from "../(headerPanel)/icons/button-checked.svg";
import emptyCircle from "../(headerPanel)/icons/button-unchecked.svg";
import Image from "next/image";
import { setChatProperties } from "@/app/(store)/features/userSlice";
import { useAppDispatch } from "@/app/(store)/hooks";
import {Socket} from "socket.io-client"
export const UsersPanel = ({ access, socket }: { access: string | null | undefined, socket:Socket }) => {
  const [friends, setFriends] = useState<
    { id: number; username: string; status: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [chosenFriend, setChosenFriend] = useState(-1);

  const dispatchForChat = useAppDispatch();

  useEffect(() => {
    const getUserFreinds = async () => {
      setLoading(true);
      try {
        const request = await retrieveFriends((access === null || access === undefined) ? "" : access);
        const response = request.data;
        setFriends(response);
        
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUserFreinds();
    return () => {
      setLoading(false);
    };
  }, [access]);

  if(friends.length === 0){
    return <h3 className={friendsStyles['empty-friends']}>So quiet in here... Try adding some friends</h3>
  }

  if (loading) {
    return <h1 className={friendsStyles['loading']}>Loading...</h1>;
  }

  socket.emit("receiveOnlineFriends", (friends))

  return (
    <section className={friendsStyles["panel"]}>
      <div className={friendsStyles["friends-list"]}>
        {friends.map((friend) => (
          <div key={friend.id} className={friendsStyles["each-friend"]} 
          onClick={()=>{ 

            

            if(chosenFriend === friend.id){
                setChosenFriend(-1);
                dispatchForChat( 
                  setChatProperties({
                    id: -1,
                    username: "",
                    chatOpen: false
                  })
                )
            }else{
                setChosenFriend(friend.id)
                dispatchForChat( 
                  setChatProperties({
                    id: friend.id,
                    username: friend.username,
                    chatOpen: true
                  })
                )
            }
            }}
          style={friend.id === chosenFriend ? {'borderBottom':'3px solid white'}: {}}>
            <div className={friendsStyles["circle-status"]}>
              <div className={friendsStyles['hand-crafted-image']}>{friend.username.charAt(0).toUpperCase()}
              </div>
              <span>
                {friend.status === 1 ? (
                  <Image
                    src={filledCircle}
                    width={20}
                    height={20}
                    alt="Online Bubble"
                  />
                ) : (
                  <Image
                    src={emptyCircle}
                    width={20}
                    height={20}
                    alt="Online Bubble"
                  />
                )}
              </span>
              
            </div>
            <div className={friendsStyles["username"]}>
              <h4>{friend.username}</h4>
            </div>
          </div>
        ))}
         
      </div>
      <hr></hr>
    </section>
  );
};

export default UsersPanel;
