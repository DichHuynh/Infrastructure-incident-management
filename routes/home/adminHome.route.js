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
router.post('/assign', controller.assignTech);
// chú ý router chung cho các trang dạng /:id nên sẽ bị nhầm đường dẫn
// giải pháp: đặt đường dẫn tĩnh lên trước.
router.get('/techList', controller.fetchTech);


router.get("/:id", controller.index);
router.get("/:id/setAccount", controller.setAccount);

router.get("/:id/manageUserAccounts", controller.manageUserAccount);
router.patch("/:id/change-status/:status/:userId", controller.changeStatus);
router.delete("/:id/deleteUser/:userId/:accountId",controller.deleteUser);

router.get("/:id/manageTechAccounts", controller.manageTechAccount);
router.get("/:id/createTech", controller.createTech);

router.patch("/:id/change-statusTech/:status/:userId", controller.changeStatusTech);
router.delete("/:id/deleteTech/:userId/:accountId", controller.deleteTech);
router.post("/:id/createTech",
  upload.single("avatar"), 
  middleware.uploadFile,
  controller.createTechPost);

router.get("/:id/manageIssue", controller.manageIssue);
module.exports = router;