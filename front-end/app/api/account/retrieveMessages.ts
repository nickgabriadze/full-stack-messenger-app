import axios from "axios";


export async function retrieveMessages(token: string, friendID: number) {
    return axios.get(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/friends/messages/${friendID}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export default retrieveMessages;