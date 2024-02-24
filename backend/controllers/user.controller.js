import bcryptjs from "bcryptjs"
import UserModel from "../models/user.model.js";
import generateWebTokenAndSetCookie from "../utils/generateToken.js";
import uploadImageOnCloudinary from "../utils/uploadToCoudinary.js";

export const signUp = async (req, res)=> {
    try {
        const {fullname, username, email, password, confirmPassword} = req.body

        console.log(req.body);
        console.log(req.files);

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords don't match"})
        }
        const user = await UserModel.findOne({username})

        if (user) {
            return res.status(400).json({error: "username already exists!"})
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const profilePicLocalPath = req.files?.profilePic[0]?.path;

        if (!profilePicLocalPath) {
            return res.status(500).json({error: "unable to upload"})
        }

        const profilePic = await uploadImageOnCloudinary(profilePicLocalPath)

        if (!profilePic) {
            return res.status(500).json({error: "please upload again"})
        }

        const newUser = new UserModel({
            fullname,
            username,
            email,
            password: hashedPassword,
            profilePic: profilePic.url
        })

        if (!newUser) {
            return res.status(500).json({error: "unable to make new user"})
        }

        if (newUser) {
            await newUser.save()
            
            generateWebTokenAndSetCookie(newUser._id, res)
            res.status(201).json({
                id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email
            })
            console.log("SignedUp 1in");
        } else{
            return res.status(400).json({error: "Invalid data"}) 
        } 
    } catch (error) {
        console.log("Error in signUp function", error.message);
        return res.status(500).json("Inter Server Error")
    }
}

export const Login = async (req, res)=> {
    
    try {
        
        const {username, password} = req.body
        if (username === "" || password === "") {
            return res.status(400).json({error: "all fields are required"})
        }
        const validuser = await UserModel.findOne({username})

        if (!validuser) {
            return res.status(409).json({error: "User not found"})
        }
        const validpassword = await bcryptjs.compare(password, validuser.password)

        if (validuser && validpassword) {

            generateWebTokenAndSetCookie(validuser._id, res)
            res.status(200).json({
                id: validuser._id,
                fullname: validuser.fullname,
                username: validuser.username,
                email: validuser.email
            })
            console.log("Logged in");
        } else {
            return res.status(400).json({error: "user doesn't exists"})
        }

    } catch (error) {
        console.log("Error in Login function", error.message);
        return res.status(500).json("Inter Server Error")
    }
}

export const logout = (req, res)=> {
    try {

        res.cookie("logOut", "", {
            maxAge: 0,
            httpOnly: true
        })
        res.status(200).json({message: "Logged Out Successfully!"})

    } catch (error) {
        console.log("Error in Login function", error.message);
        return res.status(500).json("Inter Server Error")
    }
}