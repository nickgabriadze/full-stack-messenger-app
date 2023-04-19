import axios from "axios";
export const changeStatus = (status: boolean, authorization: string) => {
    return axios.put(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/status`, {status},{
      
       headers:{
        Authorization: `Bearer ${authorization}`
       }
    })
}

export const getStatus = (authorization: string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/status`, {
        headers:{
            Authorization: `Bearer ${authorization}`
        }
    })
}

export default changeStatus;