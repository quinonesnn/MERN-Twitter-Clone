import { v2 as cloudinary } from "cloudinary";

import User from '../models/User.model.js';
import Post from '../models/post.model.js';
import Notification from '../models/notification.model.js';


export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({ error: "User not found" });
        if(!text && !img) return res.status(400).json({ error: "No text or image provided" })

        if(img) {
            const uploadedImg = await cloudinary.uploader.upload(img);
            img = uploadedImg.secure_url;
        }

        const newPost = new Post ({
            user: userId,
            text,
            img,
        })

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log("Error in createPost controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export const deletePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        // Check if you are owner of post
        if(post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "You authorized to delete this post" });
        }

        // Delete image from cloudinary
        if(post.img){
            imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch(error) {
        console.log("Error in deletePost controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export const likePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const {id:postId} = req.params;

        const post = await Post.findById(postId);
        
        if(!post) return res.status(404).json({ error: "Post not found" });

        const alreadyLiked = post.likes.includes(userId);
        if(alreadyLiked) {
            //unlike post
            await Post.updateOne({_id:postId}, {$pull: {likes: userId}});
            await User.updateOne({_id: userId}, {$pull: {likedPosts: postId}});
            return res.status(200).json({ message: "Post unliked successfully" });
        } else {
            //like post
            post.likes.push(userId);
            await User.updateOne({_id: userId}, {$push: {likedPosts: postId}});
            await post.save();

            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            });
            await notification.save();
            return res.status(200).json({ message: "Post liked successfully" });
        }
        
    } catch (error) {
        console.log("Error in likePost controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if(!text){
            return res.status(400).json({ error: "No text provided" });
        }
        const post = await Post.findById(postId);
        if (!post){
            return res.status(404).json({ error: "Post not found" });
        }

        const newComment = { user: userId, text}

        post.comments.push(newComment);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        console.log("Error in commentOnPost controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


//TODO: Delete Comment

export const getLikedPosts = async (req, res) => {
    // Get posts user liked
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({ error: "User not found" });

        const likedPosts = await Post.find({_id: {$in: user.likedPosts}})
        .populate({
            // Get user without password
            path: "user",
            select: "-password",
        }).populate({
            path: "comments.user",
            select: "-password",
        });
        res.status(200).json(likedPosts);
    } catch (error) {
        console.log("Error in getLikedPosts controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export const getFeed = async (req, res) => {
    // Get post from people user is following only to populate their feed
    try{
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({ error: "User not found" });

        const following = user.following;

        const feed = await Post.find({user: {$in: following}})
        // Get post ordered from  recently created
        .sort({ createdAt: -1 })
        // Get user without password
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });
        res.status(200).json(feed);
    } catch (error) {
        console.log("Error in getFollowingPosts controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });   
    }
}
export const getAllPosts = async (req, res) => {
    // Get all posts recently created in db
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });

        if(posts.length === 0){
            return res.status(200).json([]);
        }
        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export const getUserPosts = async (req, res) => {
    // Get all posts from a specific username
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if(!user) return res.status(404).json({ error: "User not found" });

        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 })
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        })
        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getUserPosts controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
