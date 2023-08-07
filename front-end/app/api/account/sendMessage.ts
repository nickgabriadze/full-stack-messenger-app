import axios, { AxiosResponse } from "axios"

export const sendMessageToFriend = async (token: string, messageData: {
    authorID: number,
    receiverID: number,
    messageContent: string,
    time: string
}):Promise<AxiosResponse<any,any>> => {
    return axios.post(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/friend/sendMessage`, {messageData},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default sendMessageToFriend;