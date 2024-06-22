const router = require('express').Router();
const isAuth = require('../lib/authMiddleware').isAuth;
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/change-password', isAuth, authController.changePassword);

module.exports = router