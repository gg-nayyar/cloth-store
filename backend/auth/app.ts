import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use("/api", userRouter);
app.use(express.urlencoded({ extended: true }));

export default app;
