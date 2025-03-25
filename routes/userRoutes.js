const express = require('express');
const UserController = require('../controllers/userController');
const { 
    validateUserById, 
    validateUserByFirstName, 
    validateUserByLastName, 
    validateUserByEmail, 
    validateUser 
} = require('../validators/user.dto');
const router = express.Router();

router.get('/', UserController.readAll);
router.get('/:id', validateUserById, UserController.readUserById);
router.get('/firstName/:firstName', validateUserByFirstName, UserController.readUserByFirstName);
router.get('/lastName/:lastName', validateUserByLastName, UserController.readUserByLastName);
router.get('/email/:email', validateUserByEmail, UserController.readUserByEmail);
router.get('/passByEmail/:email', validateUserByEmail, UserController.getPasswordByEmail);
router.post('/', validateUser, UserController.create);
router.post('/login', UserController.login);
router.put('/:id', validateUserById, UserController.update);
router.put('/password/:email', UserController.changePassword);
router.delete('/:id', validateUserById, UserController.delete);

module.exports = router;