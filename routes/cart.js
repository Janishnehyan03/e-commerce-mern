const router = require("express").Router();
const { verifyToken } = require("../controllers/authController.js");
const cartController = require("../controllers/cartController.js");

router.post("/add-to-cart/:id", verifyToken, cartController.addToCart);
router.patch("/remove-from-cart/:id", verifyToken, cartController.removeFromCart);
router.patch("/quantity/:id", verifyToken, cartController.changeQuantity);
router.delete("/", verifyToken, cartController.clearCart);
router.get("/", verifyToken, cartController.getCartDetails);
router.get("/total-price", verifyToken, cartController.getTotalPrice);
module.exports = router;
