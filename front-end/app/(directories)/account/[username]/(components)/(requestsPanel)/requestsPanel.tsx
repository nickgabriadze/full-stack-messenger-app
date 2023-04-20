"use client";
import Image from "next/image";
import personIcon from "./icons/person-icon.svg";
import closeIcon from "./icons/close-icon.svg";
import requestsStyle from "./requestsPanel.module.css";
import { useEffect, useState } from "react";
import searchFriends from "@/app/api/account/searchFriends";

export const RequestsPanel = ({ access }: { access: string | null | undefined}) => {
  const [reqPanel, setReqPanel] = useState(false);
  const [usersToSearch, setUsersToSearch] = useState<string>("");
  const [loadingSearchUsers, setLoadingSearchUsers] = useState(false);
  const [potentialFriends, setPotentialFriends] = useState<
    { id: number; username: string }[]
  >([]);

  useEffect(() => {
    const retrieveUsers = async () => {
      setLoadingSearchUsers(true);
      try {
        const request = await searchFriends(
          (access === null || access === undefined) ? "" : access,
          usersToSearch
        );
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

    return () => {
      setLoadingSearchUsers(false);
    };
  }, [access, usersToSearch]);

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
        <div className={requestsStyle["reqPanel"]}>
          <Image
            src={closeIcon}
            width={30}
            height={30}
            alt="Close button"
            onClick={() => setReqPanel((prev) => !prev)}
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
                {potentialFriends.map((potentialFriend) => {
                  return (
                    <div
                      key={potentialFriend.id}
                      className={requestsStyle["potential-friend"]}
                    >
                      <h3>{potentialFriend.username}</h3>
                      <button>Add</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RequestsPanel;
