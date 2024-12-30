import express  from "express";
import productRouter from "./routes/products.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api',productRouter);

export default app;