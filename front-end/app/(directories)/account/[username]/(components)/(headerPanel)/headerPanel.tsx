"use client";
import headerStyles from "./headerPanel.module.css";
import Image from "next/image";
import MessageAppLogo from "../../../../../../public/msngr-logo.png";
import filledCircle from "./icons/button-checked.svg";
import emptyCircle from "./icons/button-unchecked.svg";
import { useEffect, useState } from "react";
import changeStatus, { getStatus } from "@/app/api/account/status";
export const HeaderPanel = ({
  username,
  access,
}: {
  username: string | undefined;
  access: string | null;
}) => {
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStatusData = async () => {
      setLoading(true);
      try {
        const request = await getStatus(access === null ? "" : access);
        const data =  request.data;

        setStatus(data.status === 0 ? false : true);
      } catch (err) {
        console.log(err);
      }finally{
      
      }
    };

    getStatusData();

    return () => {
      setLoading(false)
    }
  }, [access]);

  const handleStatusUpate = async () => {
    try {
      const request = await changeStatus(status, access === null ? "" : access);
      const response = request.data;
     
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
      </div>

      {loading ? (
        <div className={headerStyles["online-offline"]}>
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
      ) : (
        <h4>Status Data Loading...</h4>
      )}
    </section>
  );
};

export default HeaderPanel;