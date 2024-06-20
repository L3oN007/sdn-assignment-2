const watchController = require('../controllers/watchController')
const router = require('express').Router()

router.get('/', watchController.getAllWatches)

module.exports = router