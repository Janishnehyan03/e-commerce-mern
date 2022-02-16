const authController = require("../controllers/authController.js");

const router = require("express").Router();

// register
router.post("/register", authController.register);

// login
router.post("/login", authController.login);
// logout
router.post("/logout", authController.verifyToken, authController.logout);
// isLoggedIn
router.get("/getUser", authController.getUser);
router.get("/verify/:token", authController.verifyEmail);
router.get("/resendVerificationEmail", authController.resendVerificationEmail);
router.post("/forgotPassword/", authController.forgotPassword);
module.exports = router;
