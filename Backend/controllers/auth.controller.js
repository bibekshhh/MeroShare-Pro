import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config()


export async function login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password) || password == user.password;
      if (!isPasswordCorrect) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ token, userId: user._id, success: true });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', success: false });
    }
}