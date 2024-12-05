const { body } = require('express-validator');

exports.validateCreate = [
  body('userName').notEmpty().withMessage('Username required'),
  body('accountNumber').notEmpty().withMessage('Account number required'),
  body('emailAddress').isEmail().withMessage('Valid email required'),
  body('identityNumber').notEmpty().withMessage('Identity number required')
];

exports.validateUpdate = [
  body('userName').optional().notEmpty().withMessage('Username required'),
  body('accountNumber').optional().notEmpty().withMessage('Account number required'),
  body('emailAddress').optional().isEmail().withMessage('Valid email required'),
  body('identityNumber').optional().notEmpty().withMessage('Identity number required')
];