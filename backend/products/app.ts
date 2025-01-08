import cors from "cors" 
import express  from "express";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/order.routes";
import productRouter from "./routes/products.routes";

const app = express();

app.use(cors({origin:process.env.GATEWAY_URI,credentials:true}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/',productRouter);
app.use('/order',orderRouter);

export default app;