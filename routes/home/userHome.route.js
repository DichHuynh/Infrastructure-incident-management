const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dy3gsgb0j",
  api_key: "612567661831846",
  api_secret: "itGMjSDdsvw1Wa_gNHkhAY_N6Yo"
});

const controller = require("../../controller/user.controller.js");
const upload = multer();
const middleware = require("../../middlewares/uploadImage.middleware.js");

router.get("/:id", controller.index);

router.get("/:id/issue", controller.issue);
router.get("/:userId/issues/:issueId", controller.issueDetail);
router.get("/:id/reportIssue", controller.reportIssue);
router.post("/:id/reportIssue", 
  upload.single("image"),
  middleware.uploadFile,
  controller.reportIssuePost);
router.get("/:id/history", controller.history);
router.get("/:id/evaluate", controller.evaluate);
router.get("/:id/setAccount", controller.setAccount);

module.exports = router;