module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); //next catches the error and passes it to the next middleware
  };
};
