const express = require("express");

const route = express.Router();
const authController = require("../controllers/authControllers");
const checkToken = require("../middlerwares/checkToken.middlerware");

route.get("/", checkToken, authController.getUser);

route.post("/signUp", authController.signUp);
route.post("/signIn", authController.logIn);
route.post("/logout", authController.logout);

route
  .route("/")
  .get(checkToken, authController.getUser)
  .put(checkToken, authController.updateUser);

module.exports = route;
