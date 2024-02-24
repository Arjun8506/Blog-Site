import express from "express";
import { Login, logout, signUp } from "../controllers/user.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/signup", upload.fields([{
    name: "profilePic",
    maxCount: 1
}]),signUp)

router.post("/login", Login)

router.post("/logout", logout)

export default router