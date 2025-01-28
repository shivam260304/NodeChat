import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectToDb } from './lib/db.js';
import cors from 'cors';
dotenv.config();

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

const port = process.env.PORT;
const app = express ();

// This will help express to extract the json data out of req.body
app.use(express.json());
app.use(express.urlencoded({extended: true })); 
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.get('/', (req,res) =>{
    res.send("This is home page")
})

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
    connectToDb();
})