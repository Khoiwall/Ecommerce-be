const mongoose = require("mongoose");

const OrderShema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: {},
  status: { type: String },
  pmId: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
});

OrderShema.index({ user_id: 1, product_id: 1 });

const Order = mongoose.model("Order", OrderShema);
module.exports = Order;
