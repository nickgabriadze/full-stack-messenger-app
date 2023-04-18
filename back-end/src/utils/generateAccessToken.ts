import jwt from "jsonwebtoken";

export const generateAccessToken = (id:number, username: string) => {
    return jwt.sign({
            id, username
    }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: '15m'
    })
}

export default generateAccessToken;