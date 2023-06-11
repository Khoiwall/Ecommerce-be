const express = require("express");
const videoController = require("../controllers/videoController");
const router = express.Router();
router
  .route("/")
  .get(videoController.getAllVideo)
  .post(videoController.createVideo);
router
  .route("/:id")
  .get(videoController.getVideo)
  .patch(videoController.updateVideo)
  .delete(videoController.deleteVideo);
module.exports = router;
