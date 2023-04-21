import axios from "axios"

export const retrieveUserFriendRequests = async (token:string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/get/friend/sentRequests`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export default retrieveUserFriendRequests;