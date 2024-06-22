const passport = require('passport');


const authenticateJWT = passport.authenticate('jwt', { session: false });
const isAuth = authenticateJWT

const isAdmin = (req, res, next) => {
    authenticateJWT(req, res, () => {
        if (req.user && req.user.isAdmin) {
            return next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }
    });
};

module.exports = { isAuth, isAdmin }