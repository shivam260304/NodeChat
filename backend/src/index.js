import express from 'express';
import dotenv from 'dotenv';
import { connectToDb } from './lib/db.js';
dotenv.config();

import authRoutes from './routes/auth.route.js';

const port = process.env.PORT;
const app = express ();

// This will help express to extract the json data out of req.body
app.use(express.json());

app.get('/', (req,res) =>{
    res.send("This is home page")
})

app.use('/api/auth', authRoutes);

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
    connectToDb();
})