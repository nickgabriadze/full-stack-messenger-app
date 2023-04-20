"use client";
import headerStyles from "./headerPanel.module.css";
import Image from "next/image";
import MessageAppLogo from "../../../../../../public/msngr-logo.png";
import filledCircle from "./icons/button-checked.svg";
import emptyCircle from "./icons/button-unchecked.svg";
import { useEffect, useState } from "react";
import changeStatus, { getStatus } from "@/app/api/account/status";
import RequestsPanel from "../(requestsPanel)/requestsPanel";
export const HeaderPanel = ({
  username,
  access,
}: {
  username: string | undefined;
  access: string | null | undefined;
}) => {
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStatusData = async () => {
      setLoading(true);
      try {
        const request = await getStatus((access === null || access === undefined) ? "" : access);
        const data = request.data;

        setStatus(data.status === 0 ? false : true);
      } catch (err) {
        console.log(err);
      } finally {
      }
    };

    getStatusData();

    return () => {
      setLoading(false);
    };
  }, [access]);

  const handleStatusUpate = async () => {
    try {
      await changeStatus(status, (access === null || access === undefined) ? "" : access);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={headerStyles["header"]}>
      <div className={headerStyles["welcome"]}>
        <h1>
          Hello <span>{username}</span>!
        </h1>
      </div>

      <div className={headerStyles["logo-div"]}>
        <Image
          src={MessageAppLogo}
          alt="Messages App Logo"
          width={60}
          height={60}
          draggable={false}
        />
        <h1>Friends</h1>
      </div>

      {loading ? (
        <div className={headerStyles["online-offline"]}>
          <div>
            <Image
              onClick={() => {
                setStatus((prev) => !prev);
                handleStatusUpate();
              }}
              src={status ? filledCircle : emptyCircle}
              width={30}
              height={30}
              alt="Online/Offline icon"
            />

            <h3>{status ? "Online" : "Offline"}</h3>
          </div>
          <RequestsPanel access={access} />
        </div>
      ) : (
        <h4>Status Data Loading...</h4>
      )}
    </section>
  );
};

export default HeaderPanel;
