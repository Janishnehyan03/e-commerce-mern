const router = require("express").Router();
const {
  verifyToken,
  verifyAdminToken,
} = require("../controllers/authController.js");
const orderController = require("../controllers/orderController.js");

router.get("/", verifyToken, orderController.getAllOrders);

router.post("/", verifyToken, orderController.createOrder);
router.post('/placeOrder', verifyToken, orderController.placeOrder);
router.post('/my-orders', verifyToken, orderController.getMyOrders);
module.exports = router;
