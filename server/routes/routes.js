const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const bodyparser = require('body-parser');

const urlencodedparser = bodyparser.urlencoded({ extended : false });





router.get('', blogsController.viewblogs);
router.get('/techsingle/:idblogs', blogsController.viewsingleblog);

module.exports = router;