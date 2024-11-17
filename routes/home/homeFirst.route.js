const express = require("express");
const multer = require("multer");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dy3gsgb0j",
  api_key: "612567661831846",
  api_secret: "itGMjSDdsvw1Wa_gNHkhAY_N6Yo"
});

const homeFirst = require("../../controller/homeFirst.controller.js");
const upload = multer();
const middleware = require("../../middlewares/uploadImage.middleware.js");

router.get("/", homeFirst.home);
router.get("/signIn", homeFirst.signIn);
router.post("/signIn", homeFirst.signInPost);
router.get("/signUp", homeFirst.signUp);
router.post("/signUp",
  upload.single("avatar"), 
  middleware.uploadFile, 
  homeFirst.signUpPost);

module.exports = router;
