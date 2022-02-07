const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.get('/most-sold', adminController.getMostSold)    

module.exports = router