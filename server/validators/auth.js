const { body } = require('express-validator');

const loginValidator = () => [
    body('memberName')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 2 })
        .withMessage('Username must be at least 2 characters long'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long')
]

const registerValidator = () => [
    body('memberName')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 2 })
        .withMessage('Username must be at least 2 characters long'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long'),
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    body('YOB')
        .notEmpty()
        .withMessage('Year of birth is required')
        .isNumeric()
]

const changePasswordValidator = () => [
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long'),
    body('newPassword')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 5 })
        .withMessage('New password must be at least 5 characters long')

]

const updateProfileValidator = () => [
    body('memberName')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    body('YOB')
        .notEmpty()
        .withMessage('Year of birth is required')
        .isNumeric()
        .withMessage('Year of birth must be a number'),
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),

]



module.exports = {
    loginValidator,
    registerValidator,
    changePasswordValidator,
    updateProfileValidator
}