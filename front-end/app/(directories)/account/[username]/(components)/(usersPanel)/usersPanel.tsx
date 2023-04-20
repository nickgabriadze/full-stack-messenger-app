"use client";
import { useEffect, useState } from "react";
import friendsStyles from "./usersPanel.module.css";
import retrieveFriends from "@/app/api/account/retrieveFriends";
import filledCircle from "../(headerPanel)/icons/button-checked.svg";
import emptyCircle from "../(headerPanel)/icons/button-unchecked.svg";
import Image from "next/image";

export const UsersPanel = ({ access }: { access: string | null }) => {
  const [friends, setFriends] = useState<
    { id: number; username: string; status: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [chosenFriend, setChosenFriend] = useState(-1);

  useEffect(() => {
    const getUserFreinds = async () => {
      setLoading(true);
      try {
        const request = await retrieveFriends(access === null ? "" : access);
        const response = request.data;
        setFriends(response);
        console.log(response);
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

  if (loading) {
    return <h1 className={friendsStyles['loading']}>Loading...</h1>;
  }

  return (
    <section className={friendsStyles["panel"]}>
      <div className={friendsStyles["friends-list"]}>
        {friends.map((friend) => (
          <div key={friend.id} className={friendsStyles["each-friend"]} 
          onClick={()=>{ 
            if(chosenFriend === friend.id){
                setChosenFriend(-1)
            }else{
                setChosenFriend(friend.id)
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
