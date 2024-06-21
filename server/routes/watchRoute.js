const watchController = require('../controllers/watchController')
const isAuth = require('../lib/authMidddleware').isAuth
const router = require('express').Router()

router.get('/', isAuth, watchController.getAllWatches)
router.get('/:id', isAuth, watchController.getWatchById)

module.exports = router