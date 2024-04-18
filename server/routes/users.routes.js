import express from "express";
import {getUser, getUserFriends, addRemoveFriend} from "../controllers/users.controller.js";
import {verifyToken} from "../middlewares/auth.js"