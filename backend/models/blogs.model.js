import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    }
}, {timestamps: true})

const BlogModel = mongoose.model("Blog", blogSchema)

export default BlogModel