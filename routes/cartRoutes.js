const express = require("express");

const route = express.Router();
const cartController = require("../controllers/cartController");
const checkToken = require("../middlerwares/checkToken.middlerware");

route.post("/create-order", checkToken, cartController.createOrder);
route.get("/user", checkToken, cartController.getCartUser);
route.post("/pm", checkToken, cartController.createPaymentIntent);
route.post("/products/:product_id", checkToken, cartController.addProduct);
route.delete("/products/:product_id", checkToken, cartController.removeProduct);

module.exports = route;
