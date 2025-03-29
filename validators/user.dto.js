const {body, param, validationResult} = require('express-validator');

const validateUser = [
    body('role')
    .isIn(['Admin', 'Customer'])
    .withMessage('role must be Admin or Customer')
    .notEmpty()
    .withMessage('role is required'),
    /*body('createdAt')
    .isDate()
    .withMessage('createdAt must be in this format: YYYY-MM-DD')
    .notEmpty()
    .withMessage('createdAt is required'),*/
    body('firstName')
    .isString()
    .withMessage('firstName must be string')
    .notEmpty()
    .withMessage('firstName is required'),
    body('lastName')
    .isString()
    .withMessage('lastName must be string')
    .notEmpty()
    .withMessage('lastName is required'),
    body('email')
    .isEmail()
    .withMessage('email must be a valid email')
    .notEmpty()
    .withMessage('email is required'),
    body('password')
    .isString()
    .withMessage('password must be string')
    .notEmpty()
    .withMessage('password is required'),
    body('phoneNbr')
    .optional({ nullable: true })  // Allows the field to be null or omitted
    .isString()
    .withMessage('phoneNbr must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateUserById = [
    param('id').isInt().withMessage('The Id must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateUserByEmail = [
    param('email').isEmail().withMessage('The email must be a valid email'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateUserByFirstName = [
    param('firstName').isString().withMessage('The firstName must be a string'),
    (req, res, next) => {
        const errors= validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateUserByLastName = [
    param('lastName').isString().withMessage('The lastName must be a string'),
    (req, res, next) => {
        const errors= validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateUserByRole = [
    param('role').isIn(['Admin', 'Customer']).withMessage('The role must be Admin or Customer'),
    (req, res, next) => {
        const errors= validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateReadUserTickets = [
    param('id').isInt().withMessage('The Id must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateUserRoleById = [
    param('id').isInt().withMessage('The Id must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateUserLogin = [
    body('email').isEmail().withMessage('The email must be a valid email'),
    body('password').isString().withMessage('The password must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateUserChangePassword = [
    body('password').isString().withMessage('The password must be a string'),
    body('newPassword').isString().withMessage('The new password must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

module.exports = {
    validateUser,
    validateUserById,
    validateUserByEmail,
    validateUserByFirstName,
    validateUserByLastName,
    validateUserByRole,
    validateReadUserTickets,
    validateUserRoleById,
    validateUserLogin,
    validateUserChangePassword
}