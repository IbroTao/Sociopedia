import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import {fileURLToPath} from "url";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import postRoutes from "./routes/posts.routes.js";
import {register} from "./controllers/auth.controllers.js";
import {createPost} from "./controllers/posts.controller.js";
import { verifyToken } from "./middlewares/auth.js";
import User from "./models/users.model.js";
import Post from "./models/posts.model.js";
import {users, posts} from "./data/index.js"

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, res) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single("picture"), verifyToken, register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes)

/* MONGOOSE SETUP */
const PORT = 6001;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    User.insertMany(users);
    Post.insertMany(posts)
}).catch((error) => console.log(`${error} did not connect`))
