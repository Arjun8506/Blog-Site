import bcryptjs from "bcryptjs"
import UserModel from "../models/user.model.js";

export const signUp = async (req, res)=> {
    try {
        const {fullname, username, email, password, confirmPassword} = req.body

        if (password !== confirmPassword) {
            res.status(400).json({error: "Passwords don't match"})
        }
        const user = await UserModel.findOne({username})

        if (user) {
            res.status(400).json({error: "username already exists!"})
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new UserModel({
            fullname,
            username,
            email,
            password: hashedPassword
        })

        if (newUser) {
            await newUser.save()
            res.status(201).json({
                id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
            })
            console.log("SignedUp 1in");
        } else{
            res.status(400).json({error: "Invalid data"}) 
        } 
    } catch (error) {
        console.log("Error in signUp function", error.message);
        res.status(500).json("Inter Server Error")
    }
}

export const Login = async (req, res)=> {
    
    try {
        
        const {username, password} = req.body
        if (username === "" || password === "") {
            res.status(400).json({error: "all fields are required"})
        }
        const validuser = await UserModel.findOne({username})
        const validpassword = bcryptjs.compare(password, validuser.password)
        if (validuser && validpassword) {
            res.status(200).json({
                id: validuser._id,
                fullname: validuser.fullname,
                username: validuser.username,
                email: validuser.email
            })
            console.log("Logged in");
        } else {
            res.status(400).json({error: "user doesn't exists"})
        }
    } catch (error) {
        console.log("Error in Login function", error.message);
        res.status(500).json("Inter Server Error")
    }

}

export const logout = (req, res)=> {
    res.status(200).send("Logout Page from controllers")
}