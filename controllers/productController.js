const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

module.exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, price, discount, images, bio } = req.body;
  const { role } = req.user;
  if (role !== "admin") {
    return next(new AppError("You are not admin", 404));
  }
  if (!name || !price || !images) {
    return res.status(400).json({
      status: "Missing value in request",
    });
  }
  const newProduct = await Product.create({
    bio,
    price,
    name,
    discount,
    images,
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
module.exports.updateDiscount = catchAsync(async (req, res, next) => {
  const { discount } = req.body;
  const { _id } = req.params;
  const { role } = req.user;
  if (role !== "admin") {
    return next(new AppError("You are not admin", 404));
  }
  if (!discount) {
    return res.status(400).json({
      status: "Missing value in request",
    });
  }

  const newProduct = await Product.findOneAndUpdate(
    {
      _id,
    },
    {
      $set: {
        discount,
      },
    }
  );
  if (!newProduct) {
    return next(new AppError("Product not found", 404));
  }
  return res.status(201).json({
    status: "success",
  });
});
module.exports.updateInforProduct = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const { role } = req.user;
  if (role !== "admin") {
    return next(new AppError("You are not admin", 404));
  }
  const newProduct = await Product.findOneAndUpdate(
    { _id },
    {
      $set: req.body,
    }
  );
  return res.status(201).json({
    status: "success",
  });
});
module.exports.getProduct = handlerFactory.getOne(Product);
module.exports.deleteProduct = handlerFactory.deleteOne(Product);
module.exports.updateProduct = handlerFactory.updateOne(Product);
