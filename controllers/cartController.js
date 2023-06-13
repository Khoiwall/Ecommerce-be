const catchAsync = require("../utils/catchAsync");
const Cart = require("../models/cartModel");
const AppError = require("../utils/appError");
const stripe = require("stripe");
const Order = require("../models/orderModel");

module.exports.addProduct = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { product_id } = req.params;
  const { quatity } = req.body;
  if (!product_id) {
    return next(new AppError("Product Id not Inval", 404));
  }

  //check
  const checkProduct = await Cart.findOne({
    user_id: _id,
    product_id: product_id,
  });
  if (checkProduct) {
    await Cart.findOneAndUpdate(
      {
        user_id: _id,
        product_id: product_id,
      },
      {
        $set: {
          quatity,
        },
      }
    );
  } else {
    await Cart.create({
      user_id: _id,
      product_id: product_id,
      quatity,
    });
  }

  const product = await Cart.findOne({
    user_id: _id,
    product_id: product_id,
  });
  if (!product) {
    return next(new AppError("Failed", 404));
  }
  return res.status(201).send({
    status: "Success",
  });
});
module.exports.getCartUser = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  //check
  const products = await Cart.find({
    user_id: _id,
  }).populate({
    path: "product_id",
    select: {},
  });

  return res.status(201).send({
    status: "Success",
    data: products,
  });
});
module.exports.removeProduct = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { product_id } = req.params;
  if (!product_id) {
    return next(new AppError("Product Id not Inval", 404));
  }

  //check
  const products = await Cart.findOneAndDelete({
    user_id: _id,
    product_id,
  });

  return res.status(201).send({
    status: "Success",
  });
});
module.exports.createPaymentIntent = catchAsync(async (req, res, next) => {
  let stripeTmp = stripe(
    "sk_test_51HyvWfLZZSnHicQjzbAWMcCXy7u8Q3lSDzCeWgJJui4AMgGvlznxytXhwt0OxqutR9H3uX0ot5CsGaj3K4t4E0j700BxtcNbZ2"
  );
  const { value } = req.body;
  const { _id } = req.params;
  const paymentIntent = await stripeTmp.paymentIntents.create({
    amount: Math.floor(Math.floor(value / 23500) * 100),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return res.status(200).send({
    status: "Success",
    clientSecret: paymentIntent.client_secret,
  });
});
module.exports.createOrder = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  //   const { products, status, pmId, phoneNumber, address } = req.body;
  await Order.create({
    user_id: _id,
    ...req.body,
  });
  return res.status(200).send({
    status: "success",
  });
});
