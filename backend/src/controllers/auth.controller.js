import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateAuthToken } from '../lib/utils.js';


export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
      if (!fullname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
  
      const user = await User.findOne({ email });
  
      if (user) return res.status(400).json({ message: "Email already exists" });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
      });
  
      if (newUser) {
        // generate jwt token here
        generateAuthToken(newUser._id, res);
        await newUser.save();
  
        res.status(201).json({
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      console.log("Error in signup controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const login = async (req,res) =>{
    
}


export const logout = (req,res) =>{
    res.send("Logout page");
}



