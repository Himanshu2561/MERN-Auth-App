import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      // verifying and getting payload.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // userId is basically which is you provided as a payload at the time cookie creation.
      req.user = await User.findById(decoded.userId);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, token did not found");
  }
});

export { protect };
