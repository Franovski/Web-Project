const express = require('express');
const UserController = require('../controllers/userController');
const { 
    validateUserById, 
    validateUserByFirstName, 
    validateUserByLastName, 
    validateUserByEmail, 
    validateUser, 
    validateUserByRole,
    validateReadUserTickets,
    validateUserLogin,
    validateUserChangePassword,
    validateUserRoleById,
    validateUpdateUser
} = require('../validators/user.dto');
const router = express.Router();

router.get('/', UserController.readAll);
router.get('/:id', validateUserById, UserController.readUserById);
router.get('/firstName/:firstName', validateUserByFirstName, UserController.readUserByFirstName);
router.get('/lastName/:lastName', validateUserByLastName, UserController.readUserByLastName);
router.get('/email/:email', validateUserByEmail, UserController.readUserByEmail);
router.get('/passByEmail/:email', validateUserByEmail, UserController.getPasswordByEmail);
router.get('/ticket/:id', validateReadUserTickets, UserController.readUserTickets);
router.get('/role/:role', validateUserByRole, UserController.readUserByRole);
router.get('/roleById/:id', validateUserRoleById, UserController.readUserRoleById);
router.post('/', validateUser, UserController.create);
router.post('/login', validateUserLogin, UserController.login);
router.put('/password/', validateUserChangePassword, UserController.changePassword);
router.put('/:id', validateUserById, validateUpdateUser, UserController.update);
router.delete('/:id', validateUserById, UserController.delete);

module.exports = router;