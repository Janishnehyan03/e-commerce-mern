const AppError = require("../utils/appError");

const handleDbCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`; // err.path is the column name and err.value is the value that was attempted to be inserted
  return new AppError(message, 400);
};
const handleDuplicateFields = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0]; // err.errmsg is
  const message = `${value} is already used. Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  const message = `Invalid token. Please log in again!`;
  return new AppError(message, 401);
};

const handleJWTExpiredError = () => {
  const message = `Your token has expired! Please log in again!`;
  return new AppError(message, 401);
};

const sendErrorDev = (err, req, res) => {
  // A) API
  // if (req.originalUrl.startsWith("/api")) {
  //   return res.status(err.statusCode).json({
  //     status: err.status,
  //     err: err,
  //     message: err.message,
  //     stack: err.stack,
  //   });
  // }
  // B) RENDERED WEBSITE
  console.error("ERROR 💥", err);
  // return res.status(err.statusCode).render("error", {});
};
const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //PROGRAMMING ERRORS
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (error.name === "CastError") error = handleDbCastError(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === "ValidatorError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};
