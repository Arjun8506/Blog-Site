import mongoose from "mongoose"

const ConnectToDB = async (res) => {
    try {
         await mongoose.connect("mongodb://127.0.0.1:27017/BlogSiteDB")
         console.log("Connected to DATABASE");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        res.status(500).json("Interval Server Error")
    }
}

export default ConnectToDB;