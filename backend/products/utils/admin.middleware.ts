import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import axios from "axios";

dotenv.config();

const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction):Promise<any | null> => {
    try {
        const cookie = req.cookies.token;
        if (!cookie) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(cookie, process.env.JWT_KEY!) as jwt.JwtPayload;
        const user = await axios.get<{ name:string,email: string,password:string }>(`http://localhost:8000/api/user/getUserbyId/${decoded.id}`);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if(user && user.data.email === process.env.ADMIN_EMAIL){
            console.log("Admin");
            next();
        }
        else{
            return res.status(200).json({ message: "Not Admin" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
export default isAdmin;