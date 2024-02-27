import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const getLoggedInUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            req.user = null
            return next()
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decodedToken) {
            req.user = null
            return next()
        }

        const user = await UserModel.findById(decodedToken.userId)

        if (!user) {
            req.user = null
            return next()
        }

        req.user = user
        
        next()

    } catch (error) {
        console.log(`Error in getLoggedInUser function ${error.message}`);
        return res.status(500).json({error: "something went wrong"})
    }
}

export default getLoggedInUser