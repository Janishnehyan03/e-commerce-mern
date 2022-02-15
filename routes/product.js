const router = require("express").Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
router.get("/", productController.getAllProducts);
router
  .route("/:id")
  .get(productController.getProduct)
  .patch(authController.verifyAdminToken, productController.updateProduct)
  .delete(authController.verifyAdminToken, productController.deleteProduct)
  .delete(authController.verifyAdminToken, productController.deleteProduct);

router.post(
  "/",
  authController.verifyAdminToken,
  productController.createNewProduct
);
router.post("/search", productController.searchProduct);

module.exports = router;
