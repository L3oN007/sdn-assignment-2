const { body } = require('express-validator');

const commentValidator = () => [
    body('content')
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 5 })
        .withMessage('Content must be at least 5 characters long'),
    body('rating')
        .notEmpty()
        .withMessage('Rating is required')
        .isNumeric()
        .withMessage('Rating must be a number')
        .isInt({ min: 1, max: 3 })
        .withMessage('Rating must be between 1 and 3'),

]

module.exports = commentValidator