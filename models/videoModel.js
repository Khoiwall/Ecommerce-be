const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true],
    },
    product_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    currentImage: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      required: [true],
    },
    link: {
      type: String,
      required: [true],
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
