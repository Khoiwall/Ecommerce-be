const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quatity: {
    type: Number,
    default: 0,
  },
});

CartSchema.index({ user_id: 1, product_id: 1 });

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
