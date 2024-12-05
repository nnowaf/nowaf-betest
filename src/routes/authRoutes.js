const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/token', 
  [
    body('emailAddress').isEmail().withMessage('Need valid email bestie! 📧'),
    body('identityNumber').notEmpty().withMessage('Identity number is required fr fr!')
  ],
  authController.generateToken
);

module.exports = router;