const { body } = require('express-validator');

const authValidator = () => [
    body('memberName')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 characters long')
        .isLength({ max: 20 })
        .withMessage('Username must be at most 20 characters long'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5 })
]

module.exports = authValidator