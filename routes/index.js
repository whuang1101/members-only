var express = require('express');
var router = express.Router();
const form = require('../controllers/userController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{ loggedIn: req.user });
});

router.get('/sign-up',function(req, res, next) {
  res.render('index');
});
router.get('/sign-out', form.sign_out)
router.post("/sign-up", form.sign_up_post);
router.post("/login", form.login_post)

module.exports = router;
