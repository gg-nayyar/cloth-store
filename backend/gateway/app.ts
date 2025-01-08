import dotenv from "dotenv"
import express from "express"
import expressProxy from "express-http-proxy"

dotenv.config();

const app = express();

app.use('/api/user', expressProxy('http://localhost:8001'))
app.use('/api/products', expressProxy('http://localhost:8002'))

app.listen(process.env.GATEWAY_PORT, ()=>{
    console.log(`Connected on port ${process.env.GATEWAY_PORT}`)
})