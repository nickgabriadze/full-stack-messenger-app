import { Request } from "express";
import jwt from "jsonwebtoken"

export interface AuthenticatedRequest extends Request {
    user: { id: string, username: string };
  }
export const verify = (req:AuthenticatedRequest, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user: { id: string, username: string }) => {
        if (err) {
          return res.status(403).json("Token is invalid");
        }
        
        req.user = user;
  
        next();
      });
    }
  };