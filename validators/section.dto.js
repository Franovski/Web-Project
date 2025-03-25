const {body, param, validationResult} = require('express-validator');

const validateSection = [
    body('name')
    .isString()
    .withMessage('name must be a string')
    .notEmpty()
    .withMessage('name is required'),
    body('rowCount')
    .isInt()
    .withMessage('rowCount must be an integer')
    .notEmpty()
    .withMessage('rowCount is required'),
    body('seatCount')
    .isInt()
    .withMessage('seatCount must be an integer')
    .notEmpty()
    .withMessage('seatCount is required'),
    body('status')
    .isIn(['Available', 'Unavailable'])
    .withMessage('status must be Available or Unavailable')
    .notEmpty()
    .withMessage('status is required'),
    body('eventId')
    .isInt()
    .withMessage('eventId must be an integer')
    .notEmpty()
    .withMessage('eventId is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateSectionById = [
    param('id').isInt().withMessage('The Id must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateSectionByName = [
    param('name').isString().withMessage('The name must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateSectionByStatus = [
    param('status').isIn(['Available', 'Unavailable']).withMessage('The status must be Available or Unavailable'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

module.exports = {
    validateSection,
    validateSectionById,
    validateSectionByName,
    validateSectionByStatus
}