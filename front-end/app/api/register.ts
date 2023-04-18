import axios from "axios";
import sha256 from "sha256";

export const registerUser = async (username: string, password: string) => {
  const encryptedPass = sha256(password);

  
  return axios.post(
    `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/account/register`,
    {
      username: username,
      password: encryptedPass,
    }
  );
};

export default registerUser;
