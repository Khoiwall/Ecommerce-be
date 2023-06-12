const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");
const CommentModel = require("../models/commentProductModel");
const User = require("../models/userModel");

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

  const newProduct = await Product.findOneAndUpdate(
    {
      _id,
    },
    {
      $set: {
        discount: discount || 0,
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
module.exports.deleteProducts = catchAsync(async (req, res, next) => {
  const { _id } = req.body;
  const { role } = req.user;
  if (role !== "admin") {
    return next(new AppError("You are not admin", 404));
  }
  for (var i = 0; i < _id?.length; i++) {
    await Product.findOneAndDelete({
      _id: _id[i],
    });
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
  await Product.findOneAndUpdate(
    { _id },
    {
      $set: req.body,
    }
  );
  return res.status(201).json({
    status: "success",
  });
});
module.exports.comment = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { content } = req.body;
  console.log(req.body);
  const { product_id } = req.params;
  const create = await CommentModel.create({
    user_id: _id,
    content: content,
    product_id,
  });
  const comment = await CommentModel.findOne({
    _id: create?._id,
  }).populate({
    path: "user_id",
    select: {},
  });
  return res.status(200).send({
    status: "Success",
    data: comment,
  });
});
module.exports.getComments = catchAsync(async (req, res, next) => {
  const { product_id } = req.params;
  const { length } = req.query;
  const comments = await CommentModel.find({
    product_id: product_id,
  })
    .limit(10)
    .skip(length * 1)
    .populate({
      path: "user_id",
      select: {},
    });
  console.log(comments);
  return res.status(200).send({
    status: "Success",
    data: comments,
  });
});
module.exports.heart = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { product_id } = req.params;
  const { isLike } = req.body;
  const status = isLike ? "push" : "pull";
  await User.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      [`$${status}`]: {
        product_id,
      },
    }
  );
  await Product.findOneAndUpdate(
    {
      _id: product_id,
    },
    {
      $inc: {
        heart: isLike ? 1 : -1,
      },
    }
  );
  return res.status(200).send({
    status: "Success",
  });
});
module.exports.getProduct = handlerFactory.getOne(Product);
module.exports.deleteProduct = handlerFactory.deleteOne(Product);
module.exports.updateProduct = handlerFactory.updateOne(Product);
