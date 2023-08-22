var express = require('express');
var router = express.Router();
const form = require('../controllers/userController');
/* GET home page. */
router.get('/', form.get_index);

router.get('/sign-up',form.get_index);
router.get('/sign-out', form.sign_out);
router.get("/login" , form.get_index);
router.post("/sign-up", form.sign_up_post);

router.post("/login", form.login_post);
router.post("/membership", form.become_member_post);
router.post("/add-message",form.add_message_post);
router.post("/delete-message",form.delete_message_post)
module.exports = router;
