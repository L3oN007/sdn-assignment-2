const { body } = require('express-validator');

const brandValidator = () => [
    body('brandName')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long')
]

module.exports = brandValidator
