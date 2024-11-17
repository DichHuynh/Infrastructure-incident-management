const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
module.exports.uploadFile = (req,res, next)=>{
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      try {
        let result = await streamUpload(req);
        req.body[req.file.fieldname] = result.secure_url; // Setting directly as 'avatar'
        next();
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        res.status(500).send({ message: "Upload failed" });
      }
    }
    upload(req);
  }else{
    next();
  }
}