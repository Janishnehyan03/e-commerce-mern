const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.route('/').get(categoryController.getAllCategories).post(categoryController.addNewCategory);

module.exports = router;
