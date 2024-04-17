import bcrypt from "bcrpyt";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js"

// <======= REGISTER USER ======>
export const register = async(req, res) => {
    try{
        const {firstName, lastName, email, password, picturePath, location, friends, occupation} = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            password: passwordHash,
            picturePath,
            email,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}
