import asyncHandler from "express-async-handler"; // This will help to write async code rather using Try/Catch block.

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler((req, res) => {
  res.status(200).json({ message: "Auth User" });
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler((req, res) => {
  res.status(200).json({ message: "Register User" });
});

// @desc    Logut a user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler((req, res) => {
  res.status(200).json({ message: "Logout User" });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler((req, res) => {
  res.status(200).json({ message: "User profile" });
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler((req, res) => {
  res.status(200).json({ message: "Update user profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
