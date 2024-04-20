import Post from "../models/posts.model";
import User from "../models/users.model";

export const createPost = async(req, res) => {
    try{
        const {userId, picturePath, description} = req.body;
        const user = await User.findById(userId);
    }
    catch(err){
        res.status(409).json({error: err.message});
    }
}