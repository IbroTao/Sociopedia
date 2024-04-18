import User from "../models/user.models";

//<==== READ ====>
export const getUser = async(req, res) => {
    try{

    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}