const watchController = require('../controllers/watchController')
const isAdmin = require('../lib/authMiddleware').isAdmin
const isAuth = require('../lib/authMiddleware').isAuth
const router = require('express').Router()

// ! GET
router.get('/', watchController.getAllWatches)
router.get('/search', watchController.searchWatch)
router.get('/:id', watchController.getWatchById)
router.get('/:watchId/comments', watchController.getAllCommentsByWatchId)

// ! CREATE
router.post('/', isAdmin, watchController.createNewWatch)
router.post('/:watchId/comments/', isAuth, watchController.createComment)

// ! UPDATE
router.put('/:id', isAdmin, watchController.updateWatchById)
router.put('/:watchId/comments/:commentId', isAuth, watchController.updateComment)

// ! DELETE
router.delete('/:id', isAdmin, watchController.deleteWatchById)
router.delete('/:watchId/comments/:commentId', isAuth, watchController.deleteCommentById)


module.exports = router