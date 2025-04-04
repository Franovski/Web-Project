const {body, param, validationResult} = require('express-validator');

const validateEvent = [
    body('name')
    .isString()
    .withMessage('name must be string')
    .notEmpty()
    .withMessage('name is required'),
    body('date')
    .isDate()
    .withMessage('date must be in this format: YYYY-MM-DD')
    .notEmpty()
    .withMessage('date is required'),
    body('time').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage('Time must be in HH:mm:ss format')
    .notEmpty()
    .withMessage('time is required'),
    body('location')
    .isString()
    .withMessage('location must be string')
    .notEmpty()
    .withMessage('location is required'),
    body('capacity')
    .isInt()
    .withMessage('capacity must be an integer')
    .notEmpty()
    .withMessage('capacity is required'),
    body('status')
    .isIn(['Active', 'Cancelled'])
    .withMessage('status must be Active or Cancelled')
    .notEmpty()
    .withMessage('status is required'),
    body('description')
    .optional({ nullable: true })  // Allows the field to be null or omitted
    .isString()
    .withMessage('description must be string'),
    body('image')
    .optional({ nullable: true })  // Allows the field to be null or omitted
    .isString()
    .withMessage('image must be string'),
    body('categoryId')
    .isInt()
    .withMessage('categoryId must be an integer')
    .notEmpty()
    .withMessage('categoryId is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateEventById = [
    param('id').isInt().withMessage('The Id must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateEventByName = [
    param('name').isString().withMessage('The name must be a string'),
    (req, res, next) => {
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateEventByStatus = [
    param('status').isIn(['Active', 'Cancelled']).withMessage('The status must be Active or Cancelled'),
    (req, res, next) => {
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateEventByCategoryId = [
    param('categoryId').isInt().withMessage('The categoryId must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateEventDateById = [
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
    validateEvent,
    validateEventById,
    validateEventByName,
    validateEventByStatus,
    validateEventByCategoryId,
    validateEventDateById
}