import express from "express";
import { Login, deleteUser, logout, signUp, updateUser, updateUserProfilePic } from "../controllers/user.controller.js";
import upload from "../middleware/multer.middleware.js";
import getLoggedInUser from "../middleware/getLoggedInUser.js";

const router = express.Router();

router.post("/signup", upload.fields([{
    name: "profilePic",
    maxCount: 1
}]),signUp)

router.post("/login", Login)

router.post("/logout", logout)

router.post("/updateuser", getLoggedInUser, updateUser)

router.post("/updateuserprofilepic", getLoggedInUser, upload.fields([{
    name: "profilePic",
    maxCount: 1
}]),updateUserProfilePic)

router.post("/deleteuser", getLoggedInUser, deleteUser)

export default router