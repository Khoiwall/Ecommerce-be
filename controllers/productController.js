const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

module.exports.createProduct = catchAsync(async (req, res, next) => {
  const { userID, name, price, discount, image } = req.body;
  if (!userID || !name || !price || !discount || !image) {
    return res.status(400).json({
      status: "Missing value in request",
    });
  }
  const newProduct = await Product.create({
    user_id: userID,
    price,
    name,
    discount,
    image,
  });
  res.status(201).json({
    status: "success",
    data: newProduct,
  });
});
module.exports.getAllProduct = catchAsync(async (req, res, next) => {
  const allProduct = await Product.find();
  res.status(200).json({
    status: "success",
    data: allProduct,
  });
});
module.exports.getProduct = handlerFactory.getOne(Product);
module.exports.deleteProduct = handlerFactory.deleteOne(Product);
module.exports.updateProduct = handlerFactory.updateOne(Product);
