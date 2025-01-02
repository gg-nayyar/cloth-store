import express  from "express";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/order.routes";
import productRouter from "./routes/products.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api/product',productRouter);
app.use('/api/order',orderRouter);

export default app;