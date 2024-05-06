import express from 'express';
import { getAllPosts,
         getUserPosts, 
         getLikedPosts, 
         getFeed, 
         createPost, 
         likePost, 
         commentOnPost, 
         deletePost,
         } from '../controllers/post.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/feed", protectRoute, getFeed);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);
//router.delete("/comment/:postId/:commentId", protectRoute, deleteComment);

export default router
