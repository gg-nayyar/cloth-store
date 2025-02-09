"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthRedirect = exports.googleAuthCallback = exports.getUserbyId = exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const googleAuth_1 = require("../utils/googleAuth");
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_model_1.default({ name, email, password: hashedPassword });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_KEY, {
            expiresIn: "168h",
        });
        res.cookie("token", token);
        res.json({ token, user });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        if (!user.password) {
            return res.status(201).json({ message: "Please login with google" });
        }
        const isValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isValid) {
            console.log("Wrong password");
            return res.status(400).json({ message: "Wrong password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_KEY, {
            expiresIn: "168h",
        });
        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
        res.json({ token, user });
    }
    catch (err) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        res.send("User Logged Out Successfully");
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.logout = logout;
// export const profile = async (req: Request, res: Response): Promise<void> => {
//   try {
//     console.log(req.user);
//     res.send(req.user);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
const getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_model_1.default.findById(id);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserbyId = getUserbyId;
const googleAuthCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    if (!code) {
        return res.status(400).json({ message: "Authorization code not provided" });
    }
    try {
        const { id_token, access_token } = yield (0, googleAuth_1.getTokens)(code);
        const googleUser = yield (0, googleAuth_1.getGoogleUserInfo)(id_token, access_token);
        const { email, name, picture, id: googleId } = googleUser;
        let user = yield user_model_1.default.findOne({ email });
        if (!user) {
            user = new user_model_1.default({ name, email, avatar: picture, googleId });
            yield user.save();
        }
        else if (!user.googleId) {
            user.googleId = googleId;
            user.avatar = picture;
            yield user.save();
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_KEY, {
            expiresIn: "7d",
        });
        res.cookie("token", token, { httpOnly: true });
        res.redirect(`${process.env.ORIGIN_LINK}`);
    }
    catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.googleAuthCallback = googleAuthCallback;
const googleAuthRedirect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authURL = (0, googleAuth_1.getGoogleAuthURL)();
    res.redirect(authURL);
});
exports.googleAuthRedirect = googleAuthRedirect;
