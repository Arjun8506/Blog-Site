import multer from "multer";
// import image from "../uploadedImages/temp"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.files);
      cb(null, '../uploadedImages/temp');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
      console.log(req.files);
    }
  })
  
const upload = multer({ storage: storage })

export default upload