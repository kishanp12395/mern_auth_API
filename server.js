import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}));


//APi Endpoints
// app.get('/',(req,res)=> res.send("API Working."));

app.use('/api/auth', userRouter)


app.listen(PORT, ()=>{
    console.log(`Server started on PORT: ${PORT}`)   
});