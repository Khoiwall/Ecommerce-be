const mongoose = require("mongoose");

const CommentsProduct = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    content: { type: String },
  },
  { timestamps: true }
);

CommentsProduct.index({ user_id: 1, product_id: 1 });

const Comment = mongoose.model("Comment", CommentsProduct);
module.exports = Comment;
