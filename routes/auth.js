const authController = require("../controllers/authController.js");
const authServices = require("../controllers/authServices.js");
const passport = require("passport");

const router = require("express").Router();
// refresh token
router.post("/check-loggedIn", authController.checkLoggedIn);

// register
router.post("/register", authController.register);

// login
router.post("/login", authController.login);
// logout
router.post("/logout",  authController.logout);
// isLoggedIn
router.get("/getUser", authController.getUser);
router.get("/verify/:token", authController.verifyEmail);
router.post("/resendVerificationEmail", authController.resendVerificationEmail);
router.post("/forgotPassword/", authController.forgotPassword);

router.post('/google/signup', authServices.googleSignup)
router.post('/facebook/signup', authServices.facebookSignup)

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    message: "Login failed",
  });
});
router.get("/login/success", (req, res) => {
  if (req.user.isVerified) {
    res.status(200).json({
      message: "Login success",
      user: req.user,
    });
  } else {
    res.status(401).json({
      message: "Login failed",
    });
  }
});
// google auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/api/v1/auth/login/failed",
  }),
  authServices.googleSignup
);
module.exports = router;
