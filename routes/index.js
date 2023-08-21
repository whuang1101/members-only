var express = require('express');
var router = express.Router();
const form = require('../controllers/userController');
/* GET home page. */
router.get('/', form.get_index);

router.get('/sign-up',form.get_index);
router.get('/sign-out', form.sign_out)
router.post("/sign-up", form.sign_up_post);
router.post("/login", form.login_post)

module.exports = router;
