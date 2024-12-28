import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/",userRouter)

export default app;