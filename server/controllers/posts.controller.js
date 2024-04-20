import Post from "../models/posts.model";
import User from "../models/users.model";

export const createPost = async(req, res) => {
    try{
        const {userId, picturePath, description} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        });

        await newPost.save();
    }
    catch(err){
        res.status(409).json({error: err.message});
    }
}