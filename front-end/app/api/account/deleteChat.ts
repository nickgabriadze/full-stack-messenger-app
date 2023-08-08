import axios from "axios";

export const deleteChat = async (token: string, friendID: number) => {
   
  return axios.delete(
    `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/friends/deleteChat/${friendID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export default deleteChat;