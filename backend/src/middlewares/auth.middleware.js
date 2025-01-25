import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authUser = (req,res,next) =>{
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message: "UnAuthorized user"})
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Invalid-Token"})
        }

        const user = User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({message: "User Not Found"})
        }

        req.user = user;
        next();

    } catch(e){
        console.log("Error in authUser middleware", e.message);
        res.status(500).json({message: "Internal Server Error"})
    }

}