import cloudinary from 'cloudinary'
import fs from 'fs'

cloudinary.v2.config({
    cloud_name: "dxyt4v9lc",
    api_key: "183751361925436",
    api_secret: "Uv_tH27Ci758Fi4sBaw47cQOG2o"
})

console.log(process.env.CLOUDINARY_API_KEY);

const uploadImageOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("Error in uploadImageOnCloudinary function", error.message);
        return res.status(500).json("Unable to Upload image on Cloud! please try again.")
    }
}

export default uploadImageOnCloudinary