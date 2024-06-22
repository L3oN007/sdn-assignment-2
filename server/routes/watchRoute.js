const watchController = require('../controllers/watchController')
const isAdmin = require('../lib/authMiddleware').isAdmin
const router = require('express').Router()

// ! GET
router.get('/', watchController.getAllWatches)
router.get('/:id', watchController.getWatchById)

// ! CREATE
router.post('/', isAdmin, watchController.createNewWatch)

// ! UPDATE
router.put('/:id', isAdmin, watchController.updateWatchById)

// ! DELETE
router.delete('/:id', isAdmin, watchController.deleteWatchById)

module.exports = router