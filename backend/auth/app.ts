import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/api',userRouter)
app.use(express.urlencoded({extended: true}));

export default app;