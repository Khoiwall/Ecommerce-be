const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  price: {
    type: Number,
    required: [true],
  },
  name: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: [true],
    },
  ],
  discount: {
    type: Number,
  },
  heart: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
