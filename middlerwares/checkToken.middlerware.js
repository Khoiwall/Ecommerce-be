const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const { promisify } = require("util");
module.exports = catchAsync(async (req, res, next) => {
  console.log(req.headers);
  console.log(!req.headers.authorization);
  console.log(!req.headers.authorization.startsWith("Bearer"));
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(
      new AppError("Missing header in request.Please connect wallet", 404)
    );
  }
  const token = req.headers.authorization.split(" ")[1];

  console.log(token);
  if (!token) {
    return next(
      new AppError(
        "Missing account token in header of request.Please login again",
        401
      )
    );
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_TOKEN_SECRET
  );
  console.log(decoded);
  // if (Date.now() > decoded.exp * 1000) {
  //   return next(new AppError("Token Expires.Login Again", 401));
  // }
  if (!decoded.id) {
    return next(new AppError("Unauthorized.You dont' have permission", 401));
  }
  const currentUser = await User.findOne({
    _id: decoded.id,
  });
  if (!currentUser) {
    return next(
      new AppError(
        "User belong with this token does not exist.Login Again",
        401
      )
    );
  }
  req.user = currentUser;
  next();
});
