import axios from "axios";

export const removeFriendRequest = async (token: string, id: number) => {
   
  return axios.delete(
    `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/friends/removeRequest/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export default removeFriendRequest;