const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');

exports.generateToken = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { emailAddress, identityNumber } = req.body;

    const user = await User.findOne({ 
      emailAddress, 
      identityNumber 
    });

    if (!user) {
      return res.status(404).json({ 
        message: "User not found!" 
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRED }
    );

    res.json({ 
      message: "Token generated",
      token 
    });
  } catch (error) {
    console.log("Failed to generate token", error);
    res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
};