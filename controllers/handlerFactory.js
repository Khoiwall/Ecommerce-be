const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

module.exports.deleteOne = function (Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc)
      return next(new AppError("No document was found by this ID", 404));
    return res.status(200).json({
      status: "success",
      message: "Delete document successfull",
    });
  });
};
module.exports.updateOne = function (Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc)
      return next(new AppError("No document was found by this ID", 404));
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};
module.exports.getOne = function (Model, populateOptions) {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const doc = await query;
    // return query object
    // == Tour.findOne({_id : req.params.id});
    if (!doc) {
      return next(new AppError("No document was found by this ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};
