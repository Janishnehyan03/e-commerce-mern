const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  try {
    let user = await User.create({
      username,
      email,
      password,
    });
    let token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(200).json({
      message: "User created successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ message: "user not found" });
  }
  let passwordIsValid = await user.comparePassword(req.body.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: "incorrect password" });
  }
  let token = await user.generateAuthToken();
  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 7,
  // });
  res.status(200).json({
    message: "Auth successful",
    status: "success",
    user,
    token: token,
  });
};

// verify token
exports.verifyToken = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  const token = authToken.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token is not valid",
      error: error,
    });
  }
};

// verify admin token for admin routes
exports.verifyAdminToken = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const token = authToken.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded._id);
    if (!user.isAdmin) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token is not valid",
      error: error,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "logged out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
