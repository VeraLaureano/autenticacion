const express = require('express');
const { setup } = require('swagger-ui-express');
const router = express.Router();
const setupDocs = require('../docs');


router.route('/').get(setup(setupDocs));

module.exports = router;