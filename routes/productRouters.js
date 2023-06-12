const express = require("express");
const productController = require("../controllers/productController");
const checkToken = require("../middlerwares/checkToken.middlerware");
const router = express.Router();

router.get("/:product_id/comments", productController.getComments);
router.post("/:product_id/comments", checkToken, productController.comment);
router.put("/:product_id/heart", checkToken, productController.heart);
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
