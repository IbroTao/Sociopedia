import bcrypt from "bcrpyt";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
import User from "../models/user.models.js"

// <======= REGISTER USER ======>
export const register = async(req, res) => {
    try{
        const {firstName, lastName, email, password, picturePath, location, friends, occupation} = req.body;

        const salt = await bcryptjs.genSalt();
        const passwordHash = await bcryptjs.hash(password, salt);

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

/* LOGGING IN */
export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({msg: "User does not exist."});

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user})
    }
    catch(err){  
        res.status(500).json({error: err.message})
    }
}

