const express = require("express");
const multer = require('multer');
const router = express.Router();
const controller = require("../../controller/admin.controller.js");

const upload = multer();
const middleware = require("../../middlewares/uploadImage.middleware.js");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dy3gsgb0j",
  api_key: "612567661831846",
  api_secret: "itGMjSDdsvw1Wa_gNHkhAY_N6Yo"
});

router.get("/:id", controller.index);
router.get("/:id/setAccount", controller.setAccount);
router.get("/:id/manageTechAccounts", controller.manageTechAccount);
router.get("/:id/manageUserAccounts", controller.manageUserAccount);
router.get("/:id/createTech", controller.createTech);
router.post("/:id/createTech",
  upload.single("avatar"), 
  middleware.uploadFile,
  controller.createTechPost);

module.exports = router;