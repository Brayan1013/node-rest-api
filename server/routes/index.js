const express = require('express');
const router = express.Router();

router.use('/users', require('./usuario'));
router.use('/login', require('./login'));
router.use('/email', require('./email'));

module.exports = router;
