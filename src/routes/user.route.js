const express = require('express');
const { postUserLogin, postUserSignup } = require('../controllers/user.controller');
const router = express.Router();

router.route('/').get((req, res) => {
  return res.end('dashboard');
});
router.route('/signup').post(postUserSignup);
router.route('/login').post(postUserLogin);

module.exports = router;