import axios from "axios"

export const retrieveRequests = async (token: string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/get/friends/requests`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default retrieveRequests;