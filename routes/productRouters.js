const express = require("express");
const productController = require("../controllers/productController");
const checkToken = require("../middlerwares/checkToken.middlerware");
const router = express.Router();
router
  .route("/")
  .get(productController.getAllProduct)
  .post(checkToken, productController.createProduct)
  .delete(checkToken, productController.deleteProducts);

router
  .route("/:_id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .put(checkToken, productController.updateInforProduct)
  .delete(checkToken, productController.deleteProduct);
router.put("/:_id/discount", checkToken, productController.updateDiscount);
module.exports = router;
