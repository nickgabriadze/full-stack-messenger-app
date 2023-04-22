import axios from "axios";

export const acceptFriendRequest = async (
  token: string,
  senderID: number //person the user got the request from
) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/friends/accept-request`,
    {
        senderID,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
