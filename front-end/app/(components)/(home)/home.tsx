import { NextPage } from "next";
import homeStyling from "./home.module.css";
import Link from "next/link";

export const Home: NextPage = () => {
  
  return (
    <>
      <div className={homeStyling['home-wrapper']}>
        <div className={homeStyling['main-section']}>
          <h1>Send messages that have meaning</h1>
           <div className={homeStyling['sign-in-up']}>
              <Link href="/login"><button>Log In</button></Link>
              <Link href="/signup"><button>Sign Up</button></Link>
           </div>
        </div>
      </div>
    </>
  );
};


export default Home;