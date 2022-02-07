const router = require("express").Router();
const {
  verifyToken,
  verifyAdminToken,
} = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");

router.get("/", userController.getAllUsers);
router.post("/:id", userController.getOneUser);
router.patch("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);
router.get(
  "/stats",
  verifyAdminToken,
  userController.getUserStats
);

module.exports = router;
