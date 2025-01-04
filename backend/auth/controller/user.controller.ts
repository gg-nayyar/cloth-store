import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import userModel from "../models/user.model";
import { getGoogleAuthURL, getTokens, getGoogleUserInfo } from "../utils/googleAuth";

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
      console.log("Wrong password");
      return res.status(400).json({ message: "Wrong password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY!, {
      expiresIn: "168h",
    });
    res.cookie("token", token,
      { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 }
    );
    res.json({ token, user });
    // res.redirect("http://localhost:3000/home");
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
export const getUserbyId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleAuthCallback = async (req: Request, res: Response): Promise<any | null> => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: "Authorization code not provided" });
  }

  try {
    const { id_token, access_token } = await getTokens(code as string);

    const googleUser = await getGoogleUserInfo(id_token, access_token);

    const { email, name, picture, id: googleId } = googleUser;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = new userModel({ name, email, avatar: picture, googleId });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      user.avatar = picture;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY!, {
      expiresIn: "7d",
    });

    res.cookie("token", token, { httpOnly: true });
    res.json({ token, user });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export const googleAuthRedirect = async (req: Request, res: Response): Promise<void> => {
  const authURL = getGoogleAuthURL();
  res.redirect(authURL);
};
