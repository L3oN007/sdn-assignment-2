var express = require('express');
var router = express.Router();

// ! AUTH ROUTE
router.use('/auth', require('./authRoute'))

// ! WATCH ROUTE
router.use('/watches', require('./watchRoute'))

module.exports = router;
