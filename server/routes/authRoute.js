const router = require('express').Router();
const isAuth = require('../lib/authMiddleware').isAuth;
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', isAuth, authController.logout);
router.get('/who-am-i', isAuth, authController.getUserById);
router.post('/change-password', isAuth, authController.changePassword);
router.post('/change-profile', isAuth, authController.updateProfile);

module.exports = router