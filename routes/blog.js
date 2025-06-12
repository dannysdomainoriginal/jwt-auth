import express from "express";
const router = express.Router()
import { allPosts, deleteBlogPost, newBlogPost, postById, updateBlogPost } from "../controllers/blogController.js";


router.route('/')
    .get(allPosts)
    .post(newBlogPost)


router.route('/:id')
    .get(postById)
    .delete(deleteBlogPost)
    .put(updateBlogPost)

export default router