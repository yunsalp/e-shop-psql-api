const express = require('express');
const usersController = require('../controllers/users');
const {verifyTokenHandler, verifyRoles} = require('../middlewares/jwtHandler');

const router = express.Router();

router.get('/', [verifyTokenHandler, verifyRoles(['Admin'])], usersController.getAllUsers);
router.get('/:id', verifyTokenHandler, usersController.getUserById);
router.post('/', usersController.createUser);
router.patch('/:id', verifyTokenHandler, usersController.updateUser);
router.delete('/:id', [verifyTokenHandler, verifyRoles(['Admin'])], usersController.deleteUser);
router.post('/login', usersController.login);

module.exports = router;