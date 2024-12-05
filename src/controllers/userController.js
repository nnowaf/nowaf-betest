const User = require('../models/userModel');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = new User(req.body);
    await user.save();
    
    res.status(201).json({
      message: "User created!",
      user
    });
  } catch (error) {
    console.log("Failed create a new user", error);
    if (error.code === 11000) {
      res.status(400).json({
        message: "Duplicate value detected! Check your inputs!"
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      });
    }
  }
};

exports.getAllUsers = async (_, res) => {
  try {
    const users = await User.find()

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found!"
      });
    } 
    
    res.status(200).json({
      message: "Users retrieved successfully!",
      data : users
    });
    
  } catch (error) {
    console.log("Failed to retrieve all user", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.getUserByAccountNumber = async (req, res) => {
  try {
    const user = await User.findOne({ accountNumber: req.params.accountNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({
      message: "User retrieved successfully!",
      data: user
    });
  } catch (error) {
    console.log("Failed to retrieve user by account number", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.getUserByIdentityNumber = async (req, res) => {
  try {
    const user = await User.findOne({ identityNumber: req.params.identityNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(
      {
        message: "User retrieved successfully!",
        data: user
      }
    );
  } catch (error) {
    console.log("Failed to retrieve user by identity number", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    console.log("Update User success : ", user);
    res.status(200).json({
      message: "User updated!",
      user
    });
  } catch (error) {
    console.log("Failed to Update User By Id : ", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    console.log("Deleted user success:", user);
    res.status(200).json({
      message: "User deleted!",
      user
    });
  } catch (error) {
    console.log("Failed to Delete User By Id : ", error )
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};