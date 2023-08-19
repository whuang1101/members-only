var express = require('express');
var router = express.Router();
const sign_up = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/sign-up", sign_up.sign_up_post);
module.exports = router;
