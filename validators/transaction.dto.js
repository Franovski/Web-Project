const {body, param, validationResult} = require('express-validator');

const validateTransaction = [
    body('status')
    .isIn(['Paid', 'Refunded'])
    .withMessage('status must be Paid or Refunded')
    .notEmpty()
    .withMessage('status is required'),
    /*body('transactionDate')
    .isDate()
    .withMessage('transactionDate must be in this format: YYYY-MM-DD')
    .notEmpty()
    .withMessage('transactionDate is required'),*/
    body('amount')
    .isDecimal()
    .withMessage('amount must be a decimal')
    .notEmpty()
    .withMessage('amount is required'),
    body('currency')
    .isString()
    .withMessage('currency must be a string')
    .notEmpty()
    .withMessage('currency is required'),
    body('paymentMethod')
    .isString()
    .withMessage('paymentMethod must be a string')
    .notEmpty()
    .withMessage('paymentMethod is required'),
    body('refundReason')
    .optional({ nullable: true })  // Allows the field to be null or omitted
    .isString()
    .withMessage('refundReason must be a string'),
    body('ticketId')
    .isInt()
    .withMessage('tickeId must be an integer')
    .notEmpty()
    .withMessage('ticketId is required'),
    body('userId')
    .isInt()
    .withMessage('userId must be an integer')
    .notEmpty()
    .withMessage('userId is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateTransactionById = [
    param('id').isInt().withMessage('The Id must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateTransactionByStatus = [
    param('status').isIn(['Paid', 'Refunded']).withMessage('The status must be Paid or Refunded'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

module.exports = {
    validateTransaction,
    validateTransactionById,
    validateTransactionByStatus
}