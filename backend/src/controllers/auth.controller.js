import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { generateAuthToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';


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
  const { email, password } = req.body;
  try{
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) return res.status(400).json({ message: "Invalid credentials" });
    
    generateAuthToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });


  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }  
}


export const logout = (req,res) =>{
  try{
    res.cookie("jwt", "", {maxAge:0});
    res.status(200).json({message: "Logged out successfully"});

  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const update = async (req,res) =>{
  try{
    const {profilePic} = req.body;
    const userId = req.user._id;
  
    if(!profilePic){
      res.status(404).json({message: "Profile Pic is required"});
    }
  
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
  
    const updateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});
  
    res.status(200).json(updateUser)
  } catch (error) {
    console.log("Error in update controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const checkAuth = (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilePic: user.profilePic,  // Include profilePic here
        createdAt: user.createdAt,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error in checkAuth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




