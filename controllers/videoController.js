const Video = require("../models/videoModel");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

module.exports.createVideo = catchAsync(async (req, res, next) => {
  const { userID, productID, name, image, description, link } = req.body;
  if (!userID || !productID || !link || !name || !description || !image) {
    return res.status(400).json({
      status: "Missing value in request",
    });
  }
  const newVideo = await Video.create({
    user_id: userID,
    product_id: productID,
    name,
    image,
    description,
    link,
  });
  res.status(201).json({
    status: "success",
    data: newVideo,
  });
});
module.exports.getAllVideo = catchAsync(async (req, res, next) => {
  const allVideo = await Video.find();
  return res.status(200).json({
    status: "success",
    data: allVideo,
  });
});
module.exports.getVideo = handlerFactory.getOne(Video);
module.exports.deleteVideo = handlerFactory.deleteOne(Video);
module.exports.updateVideo = handlerFactory.updateOne(Video);
