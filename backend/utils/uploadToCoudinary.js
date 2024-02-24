import cloudinary from 'cloudinary'
import fs from 'fs'

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImageOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("URL Of Image", response.url);
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("Error in uploadImageOnCloudinary function", error.message);
        return res.status(500).json("Unable to Upload image on Cloud! please try again.")
    }
}

export default uploadImageOnCloudinary