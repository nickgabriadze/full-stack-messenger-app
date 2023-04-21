"use client";
import Image from "next/image";
import personIcon from "./icons/person-icon.svg";
import closeIcon from "./icons/close-icon.svg";
import requestsStyle from "./requestsPanel.module.css";
import { useEffect, useState } from "react";
import searchFriends from "@/app/api/account/searchFriends";
import requestHasBeenSent from "./icons/request-has-been-sent-icon.svg";
import sendFriendRequest from "@/app/api/account/sendFriendRequest";
import RequestsFromOthers from "./receivedRequests";
import retrieveRequests from "@/app/api/account/retrieveRequests";
import retrieveUserFriendRequests from "@/app/api/account/retrieveUserSentRequests";

export const RequestsPanel = ({
  access
}: {
  access: string | null | undefined;
}) => {
  const [reqPanel, setReqPanel] = useState(false);
  const [usersToSearch, setUsersToSearch] = useState<string>("");
  const [loadingSearchUsers, setLoadingSearchUsers] = useState(false);
  const [requestSentToIds, setRequestSentToIds] = useState<number[]>([]);
  const [userRequests, setUserRequests] = useState<{id: number, username: string}[]>([]);
  const [potentialFriends, setPotentialFriends] = useState<
    { id: number; username: string }[]
  >([]);
  const [requestSent, setRequestSent] = useState<{sent: boolean, to:number}>({sent: false, to:-1});

  const userToken = access === null || access === undefined ? "" : access;
  useEffect(() => {
   
    
    const retrieveUserRequests = async () => {
      try {
        const request = await retrieveRequests(userToken);
        const users = request.data;
        
        setUserRequests(users)

      }catch(err) {
        console.log(err)
      }
    }



    const retrieveUsers = async () => {
      setLoadingSearchUsers(true);
      try {
        const request = await searchFriends(userToken, usersToSearch);
        const response = request.data;
        setPotentialFriends(response);
       
      } catch (err) {
      } finally {
        setLoadingSearchUsers(false);
      }
    };



    if (usersToSearch.trim().length != 0) {
      retrieveUsers();
    }
    if (usersToSearch.length == 0) {
      setPotentialFriends([]);
    }

    if(!reqPanel){
      setUsersToSearch("");
      
    }

    if(reqPanel) {
      retrieveUserRequests();
     
    }

    return () => {
      setLoadingSearchUsers(false);
    };
  }, [userToken, usersToSearch, reqPanel]);

  const handleFriendRequest = async (id: number) => {
    try {
      const request = await sendFriendRequest(userToken, id);
      const response = request.data;

      console.log(response);
      if(response === "OK"){
        setRequestSent({...requestSent, sent: true})
      }else{
        setRequestSent({...requestSent, sent: false})
      }
    } catch (err) {
      console.log(err);
    }
  };



 
  return (
    <section className={requestsStyle["friends-requests"]}>
      <div onClick={() => setReqPanel((prev) => !prev)}>
        <Image
          src={personIcon}
          alt="Requests and New Friends"
          width={40}
          height={40}
        />
      </div>
      {reqPanel && (
        <div
          className={requestsStyle["reqPanel"]}
         
        >
          <Image
            src={closeIcon}
            width={30}
            height={30}
            alt="Close button"
            onClick={() => {
              
              setReqPanel((prev) => !prev);
            }}
          />
          <div className={requestsStyle["req-pals"]}>
            <div className={requestsStyle["header"]}>
              <h2>Add Friends & Check Requests</h2>
            </div>

            <div className={requestsStyle["search-for-friends"]}>
              <input
                type={"search"}
                placeholder={"Search for friends..."}
                value={usersToSearch}
                onChange={(e) => {
                  setUsersToSearch(e.target.value);
                }}
              ></input>
              <div className={requestsStyle["search-friends-area"]}>
                {!loadingSearchUsers ? (
                  potentialFriends.map((potentialFriend) => {
                    return (
                      <div
                        key={potentialFriend.id}
                        className={requestsStyle["potential-friend"]}
                      >
                        <h3>{potentialFriend.username}</h3>
                       {requestSentToIds.filter(id => id === potentialFriend.id).length == 0 ? <button
                          onClick={() => {
                            handleFriendRequest(potentialFriend.id);
                            setRequestSent({...requestSent, to: potentialFriend.id})
                            setRequestSentToIds([...requestSentToIds, potentialFriend.id])
                          }}
                        >
                          Add
                        </button>:
                        <Image src={requestHasBeenSent} alt="Request has been sent" width={30} height={30} />}
                      </div>
                    );
                  })
                ) : (
                  <p className={requestsStyle["user-searching"]}>
                    Searching...
                  </p>
                )}
              </div>
              <div>{!loadingSearchUsers && potentialFriends.length === 0 && usersToSearch.length > 0 && <p className={requestsStyle["user-searching"]}>No users found with that username</p>}</div>
            </div>
          </div>

          <RequestsFromOthers requestsFromOthers={userRequests} />
        </div>
      )}
    </section>
  );
};

export default RequestsPanel;
