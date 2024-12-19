import ErrorResponse from "../errors/ErrorResponse.js";
import UserRepository from "../repositories/user.repository.js";
import asyncHandler from "../utils/asyncHandler.js";

import Account from "../models/Account.js";

import { StatusCodes } from "http-status-codes";

const userRepository = new UserRepository();

const register = asyncHandler(async (req, res, next) => {
  const user = await userRepository.create(req.body);

  const balance = Math.floor(Math.random() * 10000) + 1;

  const account = await Account.create({
    userId: user._id,
    balance,
  });

  const token = user.getJwtToken();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User registered Successfully",
    data: { token },
  });
});

const signIn = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new ErrorResponse(
      "Both username and password are required",
      StatusCodes.BAD_REQUEST
    );

  const user = await userRepository.findByUsername(username);

  if (!user) throw new ErrorResponse("User not found", StatusCodes.NOT_FOUND);

  const comparePassword = await user.compare(password);

  if (!comparePassword)
    throw new ErrorResponse("Incorret password", StatusCodes.BAD_REQUEST);

  const token = user.getJwtToken();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Login successfull",

    data: {
      token,
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
  });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const updatedUser = await userRepository.update(req.userId, req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User updated successfully",
  });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  console.log("get all users", req.query);
  const users = await userRepository.getAll(req.query.filter, req.userId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Retrived all users successfully",

    data: { users },
  });
});

const getProfile = asyncHandler(async (req, res, next) => {
  const user = await userRepository.getById(req.userId);

  if (!user)
    throw new ErrorResponse("User doesn't exist", StatusCodes.NOT_FOUND);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Profile retrieved successfully",

    data: { user },
  });
});

export { register, signIn, updateUser, getAllUsers, getProfile };
