var express = require('express');
var router = express.Router();
const watchRouter = require('./watchRoute')


router.use('/watches', watchRouter)

module.exports = router;
