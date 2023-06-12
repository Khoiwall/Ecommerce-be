const express = require("express");

const route = express.Router();
const cartController = require("../controllers/cartController");
const checkToken = require("../middlerwares/checkToken.middlerware");

route.get("/user", checkToken, cartController.getCartUser);

route.post("/products/:product_id", checkToken, cartController.addProduct);
route.delete("/products/:product_id", checkToken, cartController.removeProduct);

module.exports = route;
