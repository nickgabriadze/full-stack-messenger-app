import axios from "axios";


export async function retrieveFriends(token: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/friends`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export default retrieveFriends;