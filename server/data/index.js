import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
]

export const users = [
    {
        _id: userIds[0],
        firstName: "test",
        lastName: "me",
        email: "aaaaa@gmail.com",
        password: "$YFDIJIJ$*U$(**U*Y&^*^$*YUEY**",
        picturePath: "p11.jpeg",
        friends: [],
        location: "San Fran, CA",
        occupation: "Software Engineer",
        viewedProfile: 42525,
        impressions: 98483,
        createdAt: 11111111,
        updatedAt: 11111111,
        __v: 0,
    }
]