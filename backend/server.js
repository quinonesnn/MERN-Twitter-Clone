import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from "cloudinary";

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import notificationRoutes from './routes/notification.routes.js';

import connectMongoDB from './db/connectMongoDB.js';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

app.use(express.json({ limit: "3mb" })); // parse req.body
// Limit shouldn't be to high to prevent DoS attack 
app.use(express.urlencoded({ extended: true })); // parse form data (urlencoded)
app.use(cookieParser()); // parse cookies

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/notification", notificationRoutes);

if(process.env.NODE_ENV == "production"){
    // set the dist folder to be static assests
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    // if user dosen't go to route listed above redirect them
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    connectMongoDB();
})