import axios, { AxiosResponse } from "axios"

export const sendFriendRequest = (token: string, receiverID: number):Promise<AxiosResponse<any,any>> => {
    return axios.post(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/friend/add`, {receiverID},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default sendFriendRequest;