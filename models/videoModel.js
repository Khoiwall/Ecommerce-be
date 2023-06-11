const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true],
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true],
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: [true],
  },
  description: {
    type: String,
    required: [true],
  },
  link: {
    type: String,
    required: [true],
  },
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
