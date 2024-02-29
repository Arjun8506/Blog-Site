import UserModel from "../models/user.model.js";
import BlogModel from "../models/blogs.model.js";
import uploadImageOnCloudinary from "../utils/uploadToCoudinary.js"

export const uploadBlog = async (req, res) => {
    try {
        
        const {title, content} = req.body
        const author = req.user._id

        if (title === "", content === "") {
            return res.status(400).json({message : "all fields are required"})
        }

        if (!author) {
            return res.status(400).json({message : "log in first, not user found"})
        }

        const posterLocalPath = req.files.poster[0]?.path

        if(!posterLocalPath) {
            return res.status(400).json({message : "upload image too"})
        }

        const poster = await uploadImageOnCloudinary(posterLocalPath)

        if(!poster) {
            return res.status(500).json({message : "unable to upload image, plase try again"})
        }

        const newBlog = new BlogModel({
            title,
            content,
            poster: poster.url,
            author
        })

        if (!newBlog) {
            return res.status(500).json({ error: "unable to make new blog" })
        }

        if (newBlog) {
            await newBlog.save()

            
            const user = await UserModel.findById(author)
            
            if (!user) {
                return res.status(500).json({message : "user not found please try again"})
            }
            
            user.blogs.push(newBlog._id)
            await user.save({validateBeforeSave: false})
            
            res.status(200).json(newBlog)
        } else {
            return res.status(500).json({error: "Invalid data"})
        }

    } catch (error) {
        console.log("error while saving the blog", error.message);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateBlog = async (req, res) => {
    try {
            
        const {title, content} = req.body
        const author = req.user._id
        const blogId = req.params.id

        if (title === "", content === "") {
            return res.status(400).json({message : "all fields are required"})
        }

        const originalBlog = await BlogModel.findById(blogId)

        if (!originalBlog) {
            return res.status(400).json({message : "originalBlog doesn't found"})
        }

        if (originalBlog.author.toString() !== author.toString()) {
            return res.status(400).json({message : "not the authorised user"})
        }

        if (originalBlog.author.toString() == author.toString()) {
         
            const blog = await BlogModel.findByIdAndUpdate(blogId, {
                $set: {
                    title,
                    content
                }
            }, {new: true})

            await blog.save({validateBeforeSave: false})
            
            res.status(200).json({message: "Updated Successfully"})
        } else {
            return res.status(500).json({message : "unable to update blog"})
        }

    } catch (error) {
        console.log("error while updating the blog => ", error.message);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteBlog = async (req, res) => {
    try {
        
        const blogId = req.params.id
        const author = req.user._id

        if (!blogId) {
            return res.status(400).json({error : "select blog first"})
        }

        if (!author) {
            return res.status(400).json({error : "log in first"})
        }

        const originalBlog = await BlogModel.findById(blogId)

        if (!originalBlog) {
            return res.status(400).json({error : "unable to find the blog"})
        }

        if (originalBlog.author.toString() == author.toString()) {
            const blog = await BlogModel.findByIdAndDelete(blogId)
            
            if (!blog) {
                return res.status(400).json({error : "unable to delete blog"})
            }

            if (blog) {
                res.status(200).json({message : "deleted blog successfully"})
            }
        } else {
            return res.status(400).json({error : "unable to delete the blog"})
        }

    } catch (error) {
        console.log("error while deleting the blog => ", error.message);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const updatePoster = async (req, res) => {
    try {
        
        const author = req.user._id
        const blogId = req.params.id

        if (!blogId) {
            return res.status(400).json({error : "select blog first"})
        }

        if (!author) {
            return res.status(400).json({error : "log in first"})
        }

        const posterLocalPath = req.files.poster[0]?.path
        
        if (!posterLocalPath) {
            return res.status(400).json({error : "upload image correctly"})
        }
        
        const poster = await uploadImageOnCloudinary(posterLocalPath)
        
        if (!poster) {
            return res.status(400).json({error : "problem while uploading the image on cloudinary, plase try again"})
        }
        
        const originalBlog = await BlogModel.findById(blogId)
        
        if (!originalBlog) {
            return res.status(400).json({error : "unable to find the blog"})
        }

        if (originalBlog.author.toString() == author.toString()) {
            const blog = await BlogModel.findByIdAndUpdate(blogId, {
                $set: {
                    poster: poster.url
                }
            }, { new: true })

            if (!blog) {
                return res.status(400).json({error : "unable to update the poster of blog"})
            }

            if (blog) {

                await blog.save({validateBeforeSave: false})

                res.status(200).json(blog)
            }

        } else {
            return res.status(500).json({message: "sorry, try again"})
        }

    } catch (error) {
        console.log("error while updateing the poster => ", error.message);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getAllBlogs = async (req, res) => {
    try {

        const author = req.user._id
        console.log("User ID from request:", req.user._id);
        if (!req.user._id) {
            return res.status(400).json({error : "log in first"})
        }

        const user = await UserModel.findById(author).populate('blogs')

        if (!user) {
            return res.status(500).json({error : "unable to get the blogt details"})
        }

        const blogs = user.blogs || [];

        res.status(200).json({ blogs })

    } catch (error) {
        console.log("error while getAllBlogs the poster => ", error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}