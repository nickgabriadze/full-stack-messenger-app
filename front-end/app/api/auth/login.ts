import axios from "axios";
import sha256 from "sha256";

export default async function login(username: string, password: string) {


  return axios.post(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/login`, {
    username: username,
    password: password,
  });
}
