import { StatusCodes } from "http-status-codes";
import ErrorResponse from "../errors/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { JWT_SECRET } from "../config/server.config.js";

import jwt from "jsonwebtoken";

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) throw new ErrorResponse("Please login", StatusCodes.UNAUTHORIZED);

  const { userId } = jwt.verify(token, JWT_SECRET);

  req.userId = userId;

  next();
});

export default auth;
