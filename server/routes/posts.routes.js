import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.controller";
import {verifyToken} from "../middlewares/auth.js"