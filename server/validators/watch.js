const { body } = require('express-validator');

const watchValidator = () => [
    body('watchName')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    body('image')
        .notEmpty()
        .withMessage('Image is required')
        .isURL()
        .withMessage('Image must be a valid URL'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isNumeric()
        .withMessage('Price must be a number'),
    body('watchDescription')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 5 })
        .withMessage('Description must be at least 5 characters long'),
    body('automatic')
        .notEmpty()
        .withMessage('Automatic is required')
        .isBoolean()
        .withMessage('Automatic must be a boolean'),
    body('brand')
        .notEmpty()
        .withMessage('Brand is required')
        .isMongoId()
        .withMessage('Brand must be a valid ID'),

]

module.exports = watchValidator