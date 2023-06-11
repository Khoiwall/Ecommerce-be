const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true],
  },
  price: {
    type: Number,
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
  discount: {
    type: Number,
    required: [true],
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
