const {body, param, validationResult} = require('express-validator');

const validatePrice = [
    body('ticketPrice')
    .isDecimal()
    .withMessage('ticketPrice must be decimal')
    .notEmpty()
    .withMessage('ticketPrice is required'),
    body('eventId')
    .isInt()
    .withMessage('eventId must be an integer')
    .notEmpty()
    .withMessage('eventId is required'),
    body('sectionId')
    .isInt()
    .withMessage('sectionId must be an integer')
    .notEmpty()
    .withMessage('sectionId is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validatePriceById = [
    param('id').isInt().withMessage('The Id must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

module.exports = {
    validatePrice,
    validatePriceById
}
