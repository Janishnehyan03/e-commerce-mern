const router = require("express").Router();
const {
  verifyToken,
  verifyAdminToken,
} = require("../controllers/authController.js");
const orderController = require("../controllers/orderController.js");

router.get("/", verifyToken, orderController.getAllOrders);

router.post("/", verifyToken, orderController.createOrder);
router.post('/my-orders', verifyToken, orderController.getMyOrders);
router.post('/payment-verify', verifyToken, orderController.verifyPayment)
router.post('/orderId', verifyToken, orderController.createOrderId)
module.exports = router;
