import express from "express";
import { Login, logout, signUp } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUp)

router.post("/login", Login)

router.get("/logout", logout)

export default router