const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const userValidator = require('../validators/userValidator');
const router = express.Router();


// Public routes
router.post('/add', userValidator.validateCreate, userController.createUser);
router.get('/all', userController.getAllUsers);

// Protected routes with JWT
router.use(authMiddleware);
router.get('/account/:accountNumber', userController.getUserByAccountNumber);
router.get('/identity/:identityNumber', userController.getUserByIdentityNumber);
router.put('/:id', userValidator.validateUpdate, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;