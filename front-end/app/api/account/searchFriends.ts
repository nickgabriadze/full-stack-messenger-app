import axios from "axios"

export const searchFriends = async (token:string, username: string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/search/friends/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default searchFriends;