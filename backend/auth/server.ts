import app from "./app";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(app)

async function connect(){
    mongoose.connection.once('open', () => {
        console.log('Connected to database');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to database', err);
        return process.exit(1);
    });
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        server.listen(8001, () => {
          console.log("Server is running on port 8001");
        });
    } catch (error) {
        console.log('Error connecting to database', error);
        return process.exit(1);
    }
};
connect();

