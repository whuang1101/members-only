var express = require('express');
var router = express.Router();
const form = require('../controllers/userController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/sign-up',function(req, res, next) {
  res.render('index');
});

router.post("/sign-up", form.sign_up_post);


module.exports = router;
