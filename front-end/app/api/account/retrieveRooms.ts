import axios from "axios";


export async function retrieveFriendChatRooms(token: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/rooms`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export default retrieveFriendChatRooms;