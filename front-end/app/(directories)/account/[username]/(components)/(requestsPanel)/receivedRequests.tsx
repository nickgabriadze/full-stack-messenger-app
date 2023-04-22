"use client";

import removeFriendRequest from "@/app/api/account/removeFriendRequest";
import requestsStyles from "./requestsPanel.module.css";
import { useState } from "react";
import { acceptFriendRequest } from "@/app/api/account/acceptRequest";

export const RequestsFromOthers = ({
  requestsFromOthers,
  access,
}: {
  access: string;
  requestsFromOthers: { senderID: number; username: string }[];
}) => {
  const [acceptedOrIgnored, setAcceptedOrIgnored] = useState<
    {
      id: number;
      acceptedOrIgnored: boolean; //true if accepted, false if ignored
    }[]
  >([]);
  const handleRemoveRequest = async (idToPass: number) => {
    try {
      await removeFriendRequest(access, idToPass);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccepterRequest = async (senderID:number) => {
      try{
        await acceptFriendRequest(access, senderID);

      }catch(err){
        console.log(err);
      }
  }

  if (requestsFromOthers.length === 0) {
    return (
      <div className={requestsStyles["from-others-header"]}>
        <h1>Received Requests</h1>
        <p className={requestsStyles["no-requests"]}>Seems empty...</p>
      </div>
    );
  } else {
    return (
      <section className={requestsStyles["from-others"]}>
        <div className={requestsStyles["from-others-header"]}>
          <h1>Received Requests</h1>
        </div>

        <div className={requestsStyles["users-list"]}>
          {requestsFromOthers.map((eachRequest) => (
            <div
              key={eachRequest.senderID}
              className={requestsStyles["each-user-req"]}
            >
              <h3>{eachRequest.username}</h3>
              <div className={requestsStyles["accept-ignore"]}>
                {acceptedOrIgnored.filter((each) => each.id === eachRequest.senderID).length === 0 ? (
                  <>
                    <button className={requestsStyles["accept"]}
                    
                    onClick={() => {
                      handleAccepterRequest(eachRequest.senderID)
                      setAcceptedOrIgnored([...acceptedOrIgnored, {
                        id: eachRequest.senderID, 
                        acceptedOrIgnored: true
                      }])
                    }}
                    >Accept</button>
                    <button
                      className={requestsStyles["ignore"]}
                      onClick={() => {
                        handleRemoveRequest(eachRequest.senderID);
                        setAcceptedOrIgnored([
                          ...acceptedOrIgnored,
                          {
                            id: eachRequest.senderID,
                            acceptedOrIgnored: false,
                          },
                        ]);
                      }}
                    >
                      Ignore
                    </button>
                  </>
                ) : (
                  <p className={requestsStyles["request-removed-or-accepted"]}>
                    {acceptedOrIgnored.filter(each => each.id === eachRequest.senderID)[0].acceptedOrIgnored ?
                    "Request accepted!" : "Request rejected!"}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
};

export default RequestsFromOthers;
