const express = require('express');
const { postUserLogin, postUserSignup, patchUser } = require('../controllers/user.controller');
const authentication = require('../middlewares/auth');
const router = express.Router();

router.route('/').patch(authentication, patchUser);
router.route('/signup').post(postUserSignup);
router.route('/login').post(postUserLogin);

module.exports = router;