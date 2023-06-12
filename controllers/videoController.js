const Video = require("../models/videoModel");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

module.exports.createVideo = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user;
  if (role !== "admin") {
    return next(new AppError("You are not admin", 404));
  }
  const { products, name, images, bio, link, currentImage } = req.body;

  const newVideo = await Video.create({
    user_id: _id,
    product_id: products,
    name,
    images,
    currentImage,
    bio,
    link,
  });
  const video = await Video.findOne({
    _id: newVideo?._id,
  }).populate({
    path: "product_id",
    select: {},
  });
  res.status(201).json({
    status: "success",
    data: video,
  });
});
module.exports.getAllVideo = catchAsync(async (req, res, next) => {
  const allVideo = await Video.find().populate({
    path: "product_id",
    select: {},
  });
  return res.status(200).json({
    status: "success",
    data: allVideo,
  });
});
module.exports.getAllVideoHaveProducts = catchAsync(async (req, res, next) => {
  const allVideo = await Video.find({ product_id: { $exists: true, $ne: [] } })
    .populate({
      path: "product_id",
      select: {},
    })
    .limit(5);
  return res.status(200).json({
    status: "success",
    data: allVideo,
  });
});
module.exports.getVideo = handlerFactory.getOne(Video);
module.exports.deleteVideo = handlerFactory.deleteOne(Video);
module.exports.updateVideo = handlerFactory.updateOne(Video);
