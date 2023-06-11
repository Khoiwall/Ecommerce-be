const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const emailRex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//name , password, email, passwordConfirm ,photo
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please send me your name"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    trim: true,
    minlength: 8,
    select: false, // bi an di voi moi ham find(),findOne,....
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (val) {
        return emailRex.test(val);
      },
      message: "Please enter a valid email address",
    },
  },
  avatar: {
    type: String,
  },
  bio: { type: String },
  coverImage: { type: String },
});
userSchema.pre("save", async function (next) {
  //only run when password is modified;
  if (!this.isModified("password")) return next();
  // hash PW
  this.password = await bcrypt.hash(this.password, 12);
  // don't store passwordConfirm
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next(); //isNew check co phai gia tri moi tao hay k
  this.passwordChangeAt = Date.now();
  next();
});
// khai bao ham cho instance of User
userSchema.methods.correctPassword = async function (loginPass, userPass) {
  const result = await bcrypt.compare(loginPass, userPass);
  return result;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
