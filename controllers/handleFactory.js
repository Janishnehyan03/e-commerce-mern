const APIFeatures = require("../utils/apiFeatures");

exports.getAll = (Model) => async (req, res, next) => {
  let filter = {}; // to allow for nested getReviews on single tour
  if (req.params.id) filter = { tour: req.params.id };
  //EXECUTE THE QUERY
  const features = new APIFeatures(Model.find(filter), req.query) //[Tour.find()] is the queryObj & [req.query] is queryString
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doc = await features.query;
  //SEND RESPONSE
  res.status(200).json({
    results: doc.length,
    doc,
  });
};
