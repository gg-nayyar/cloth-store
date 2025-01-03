import dotenv from "dotenv";
import express from "express";

dotenv.config();

const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if(req.user && req.user.email === process.env.ADMIN_EMAIL){
            next();
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
export default isAdmin;