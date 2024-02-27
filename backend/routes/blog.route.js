import express from "express";
import upload from "../middleware/multer.middleware.js";
import getLoggedInUser from "../middleware/getLoggedInUser.js";
import { deleteBlog, updateBlog, updatePoster, uploadBlog } from "../controllers/blog.controller.js";

const router = express.Router()

router.post("/uploadblog", getLoggedInUser, upload.fields([{
    name: "poster",
    maxCount: 1
}]), uploadBlog)

router.post("/updateblog/:id", getLoggedInUser, updateBlog)

router.post("/updateposter/:id", getLoggedInUser, upload.fields([{
    name: "poster",
    maxCount: 1
}]), updatePoster)

router.post("/deleteblog/:id", getLoggedInUser, deleteBlog)

export default router