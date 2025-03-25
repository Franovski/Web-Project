const {body, param, validationResult} = require('express-validator');

const validateTicket = [
    body('status')
    .isIn(['Purchased', 'Refunded'])
    .withMessage('status must be Purchased or Refunded')
    .notEmpty()
    .withMessage('status is required'),
    body('seatNumber')
    .isString()
    .withMessage('seatNumber must be string')
    .notEmpty()
    .withMessage('seatNumber is required'),
    body('purchaseDate')
    .isDate()
    .withMessage('purchaseDate must be in this format: YYYY-MM-DD')
    .notEmpty()
    .withMessage('purchaseDate is required'),
    body('expiryDate')
    .isDate()
    .withMessage('expiryDate must be in this format: YYYY-MM-DD')
    .notEmpty()
    .withMessage('expiryDate is required'),
    body('qrCode')
    .isString()
    .withMessage('qrCode must be string')
    .notEmpty()
    .withMessage('qrCode is required'),
    body('sectionId')
    .isInt()
    .withMessage('sectionId must be an integer')
    .notEmpty()
    .withMessage('sectionId is required'),
    body('userId')
    .isInt()
    .withMessage('userId must be an integer')
    .notEmpty()
    .withMessage('userId is required'),
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

const validateTicketById = [
    param('id').isInt().withMessage('The Id must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateTicketByStatus = [
    param('status').isIn(['Purchased', 'Refunded']).withMessage('The status must be Purchased or Refunded'),
    (req, res, next) => {
        const errors= validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

module.exports = {
    validateTicket,
    validateTicketById,
    validateTicketByStatus
}