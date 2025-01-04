import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";

interface Iuser {
    _id: string;
    name: string;
    email: string;
    password: string;
    googleId?: string;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction):Promise<any|null> => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_KEY!) as jwt.JwtPayload;
        const user = await userModel.findById(decoded.id)
        if (user) {
            req.user = user as Iuser;
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
    