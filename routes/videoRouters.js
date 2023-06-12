const express = require("express");
const videoController = require("../controllers/videoController");
const checkToken = require("../middlerwares/checkToken.middlerware");
const router = express.Router();
router.get("/products", videoController.getAllVideoHaveProducts);
router
  .route("/")
  .get(videoController.getAllVideo)
  .post(checkToken, videoController.createVideo);
router
  .route("/:id")
  .get(videoController.getVideo)
  .patch(videoController.updateVideo)
  .delete(videoController.deleteVideo);
module.exports = router;
