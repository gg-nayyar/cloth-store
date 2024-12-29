import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { Request, Response } from "express";
import { googleAuth } from "../utils/googleAuth";

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
    res.json({ token, user });
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
    if(!user.password){
        return res.status(201).json({message:"Please login with google" });
    }
    const isValid = await bcrypt.compare(password, user.password!);
    if (!isValid) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY!, {
      expiresIn: "168h",
    });
    res.cookie("token", token);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};
export const logout = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    res.clearCookie("token");
    res.send("User Logged Out Successfully");
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.user);
    res.send(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const googleLogin = async (
  req: Request,
  res: Response
): Promise<any | void> => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }
  try {
    const user = await googleAuth(token);
    const existingUser = await userModel.findOne({ email: user.email });
    if (!existingUser) {
        const newUser = new userModel({
            name: user.name,
            email: user.email,
            googleId: user.googleId,
            avatar: user.picture,
        });
        await newUser.save();
    }else if (!user.googleId) {
        user.googleId = user.googleId;
        user.avatar = user.picture;
        await user.save();
      }
    const authToken = jwt.sign({ id: existingUser!._id }, process.env.JWT_KEY!, {
      expiresIn: "168h",
    });
    res.cookie("token", authToken);
    return res.json({ authToken, user: existingUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
// const client = new OAuth2Client(process.env.CLIENT_ID);
// export const googleAuth = async(token:string):Promise<any>=>{

// }
