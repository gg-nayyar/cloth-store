import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { Request, Response } from "express";

dotenv.config();

export const register = async (
  req: Request,
  res: Response
): Promise<any | void> => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY!, {
      expiresIn: "168h",
    });
    res.cookie("token", token);
    res.json({token, user});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (
  req: Request,
  res: Response
): Promise<any | void> => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY!, {
      expiresIn: "168h",
    });
    res.cookie("token", token);
    res.json({token, user});
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};
export const logout = async(req:Request,res:Response):Promise<any | null>=>{
    try{
        res.clearCookie("token");
        res.send("User Logged Out Successfully")
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const profile = async(req:Request,res:Response):Promise<any| null>=>{
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}
