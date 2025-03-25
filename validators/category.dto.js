const { body, param, validationResult } = require('express-validator');

const validateCategory = [
    body('name')
        .isString()
        .withMessage('name must be string')
        .notEmpty()
        .withMessage('name is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateCategoryId = [
    param('id').isInt().withMessage('The Id must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();

    }
]

const validateCategoryByName = [
    param('name').isString().withMessage('The name must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

module.exports = {
    validateCategory,
    validateCategoryId,
    validateCategoryByName
}