import bcryptjs from "bcryptjs"
import UserModel from "../models/user.model.js";
import generateWebTokenAndSetCookie from "../utils/generateToken.js";
import uploadImageOnCloudinary from "../utils/uploadToCoudinary.js";

export const signUp = async (req, res) => {
    try {
        const { fullname, username, email, password, confirmPassword } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" })
        }
        const user = await UserModel.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "username already exists!" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const profilePicLocalPath = req.files?.profilePic[0]?.path;

        if (!profilePicLocalPath) {
            return res.status(500).json({ error: "unable to upload" })
        }

        const profilePic = await uploadImageOnCloudinary(profilePicLocalPath)

        if (!profilePic) {
            return res.status(500).json({ error: "please upload again" })
        }

        const newUser = new UserModel({
            fullname,
            username,
            email,
            password: hashedPassword,
            profilePic: profilePic.url
        })

        if (!newUser) {
            return res.status(500).json({ error: "unable to make new user" })
        }

        if (newUser) {
            await newUser.save()

            generateWebTokenAndSetCookie(newUser._id, res)
            res.status(201).json({
                id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
            console.log("SignedUp 1in");
        } else {
            return res.status(400).json({ error: "Invalid data" })
        }
    } catch (error) {
        console.log("Error in signUp function", error.message);
        return res.status(500).json("Internal Server Error")
    }
}

export const Login = async (req, res) => {

    try {

        const { username, password } = req.body
        if (username === "" || password === "") {
            return res.status(400).json({ error: "all fields are required" })
        }
        const validuser = await UserModel.findOne({ username })

        if (!validuser) {
            return res.status(409).json({ error: "User not found" })
        }
        const validpassword = await bcryptjs.compare(password, validuser.password)

        if (validuser && validpassword) {

            generateWebTokenAndSetCookie(validuser._id, res)
            res.status(200).json({
                id: validuser._id,
                fullname: validuser.fullname,
                username: validuser.username,
                email: validuser.email,
                profilePic: validuser.profilePic
            })
            console.log("Logged in");
        } else {
            return res.status(400).json({ error: "user doesn't exists" })
        }

    } catch (error) {
        console.log("Error in Login function", error.message);
        return res.status(500).json("Internal Server Error")
    }
}

export const logout = (req, res) => {
    try {

        res.cookie("logOut", "", {
            maxAge: 0,
            httpOnly: true
        })
        res.status(200).json({ message: "Logged Out Successfully!" })

    } catch (error) {
        console.log("Error in Logout function", error.message);
        return res.status(500).json("Internal Server Error")
    }
}

export const updateUser = async (req, res) => {
    try {

        const { fullname, password, email } = req.body

        if (!fullname || !password || !email) {
            return res.status(400).json({ error: "all fields are required" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        if (!hashedPassword) {
            return res.status(500).json({ error: "error in the part of hashing the password" })
        }

        const user = await UserModel.findByIdAndUpdate(req.user?._id, {
            $set: {
                fullname,
                email,
                password: hashedPassword
            }
        }, { new: true })

        if (user === null) {
            return res.status(500).json({ message: "user is null" })
        }

        if (user) {
            await user.save({ validateBeforeSave: false })

            res.status(200).json({
                id: user._id,
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic
            })

            console.log("updated the user");

        } else {
            return res.status(500).json({ message: "Unable to update" })
        }

    } catch (error) {
        console.log("Error in updateuser function", error.message);
        return res.status(500).json("Internal Server Error")
    }
}

export const updateUserProfilePic = async (req, res) => {
    try {

        const profilePicLocalPath = req.files.profilePic[0]?.path

        if (!profilePicLocalPath) {
            return res.status(400).json({ message: "again upload the image" })
        }

        const profilePic = await uploadImageOnCloudinary(profilePicLocalPath)

        if (!profilePic) {
            return res.status(400).json({ message: "problem while uploading the image on cloudinaty" })
        }

        const user = await UserModel.findByIdAndUpdate(req.user?.id, {
            $set: {
                profilePic: profilePic.url
            }
        }, { new: true })

        if (user === null) {
            return res.status(500).json({ message: "user is null" })
        }

        if (user) {
            await user.save({ validateBeforeSave: false })
            res.status(200).json({
                id: user._id,
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic
            })

            console.log("updated the user profile pic");
        } else {
            return res.status(500).json({ message: "Unable to update" })
        }

    } catch (error) {
        console.log("Error in updateuserprofilepic function", error.message);
        return res.status(500).json("Internal Server Error")
    }
}

export const deleteUser = async (req, res) => {
    try {

        const user = await UserModel.findByIdAndDelete(req.user?._id).select("-password")

        if (!user) {
            return res.status(500).json({ message: "unable to get the logged in user plases log in again" })
        }

        res.cookie("deletedCookie", "", {
            maxAge: 0,
            httpOnly: true
        })

        res.status(200).json({
            message: "Deleted User Successfully"
        })

    } catch (error) {
        console.log("Error in deleteUser function", error.message);
        return res.status(500).json("Internal Server Error")
    }
}