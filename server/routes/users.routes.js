import express from "express";
import {getUser, getUserFriends, addRemoveFriend} from "../controllers/users.controller.js";
import {verifyToken} from "../middlewares/auth.js";

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

/* UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

