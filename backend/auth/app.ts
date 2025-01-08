import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.ORIGIN_LINK, credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use("/", userRouter);
app.use(express.urlencoded({ extended: true }));

export default app;
