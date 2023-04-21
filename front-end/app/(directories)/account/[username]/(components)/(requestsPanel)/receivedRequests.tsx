"use client";

import removeFriendRequest from "@/app/api/account/removeFriendRequest";
import requestsStyles from "./requestsPanel.module.css";
import { useState } from "react";

export const RequestsFromOthers = ({
  requestsFromOthers,
  access,
}: {
  access: string;
  requestsFromOthers: { senderID: number; username: string }[];
}) => {
  const [removedID, setRemovedID] = useState<number[]>([]);


  const handleRemoveRequest = async (idToPass: number) => {
    try {
     await removeFriendRequest(access, idToPass);
    } catch (err) {
      console.log(err);
    }
  };

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
          {requestsFromOthers.map((eachRequest) => 
             (
              <div
                key={eachRequest.senderID}
                className={requestsStyles["each-user-req"]}
              >
                <h3>{eachRequest.username}</h3>
                <div className={requestsStyles["accept-ignore"]}>
                  {removedID.filter((eachID) => eachID === eachRequest.senderID).length === 0 ? <><button className={requestsStyles["accept"]}>Accept</button>
                  <button
                    className={requestsStyles["ignore"]}
                    onClick={() => {
                     
                      handleRemoveRequest(eachRequest.senderID);
                      setRemovedID([...removedID, eachRequest.senderID]);
                    }}
                  >
                    Ignore
                  </button>
                  </>
                  : <p className={requestsStyles['request-removed']}>Request Removed!</p>
                }
                </div>
              </div>)
             )
        }
        </div>
      </section>
    );
  }
};

export default RequestsFromOthers;
